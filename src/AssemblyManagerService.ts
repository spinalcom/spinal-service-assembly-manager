import {
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalContext,
  SpinalGraphService,
  SpinalNode
} from "spinal-env-viewer-graph-service";
import {
  CONTEXT_NAME, FAMILY_RELATION_NAME,
  PART_RELATION_NAME,
  TRANSFORMATION_RELATION_NAME
} from "./Constants";


export class AssemblyManagerService {

  public context: SpinalContext;
  public contextId: string;
  public static mapNodeIdByModelId: Map<number, string> = new Map();
  public static mapModelByPartId: Map<string, Autodesk.Viewing.Model> = new Map();

  constructor() {
    this.context = SpinalGraphService.getContext(CONTEXT_NAME);
    this.setContextId();
  }

  /**
   * set the contextId from the context if defined create the context otherwise
   */
  setContextId(): void {
    if (!this.context) {
      SpinalGraphService.addContext(CONTEXT_NAME).then(context => {
        this.context = context;
        this.contextId = context.info.id.get()
      })
    } else {
      this.contextId = this.context.info.id.get()
    }
  }


  /**
   * Return the family with the given name
   * @param familyName
   * @return Promise<any>
   */
  getFamily(familyName: string): Promise<any> {
    //TODO export interface from Spinal Graph Service
    return SpinalGraphService.getChildren(this.contextId, [FAMILY_RELATION_NAME])
      .then(children => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].name.get() === familyName)
            return children[i];
        }
        return null;
      });
  }


  /**
   * Create a new family in the assembly
   * @param familyName string
   * @return {Promise<SpinalNode>} return the newly family node created
   */
  createFamily(familyName: string): Promise<SpinalNode> {
    return SpinalGraphService.getChildren(this.contextId, [FAMILY_RELATION_NAME])
      .then(children => {

        for (let i = 0; i < children.length; i++) {

          if (children[i].name.get() === familyName)
            return;

        }

        const familyId = SpinalGraphService.createNode({name: familyName}, undefined);

        return SpinalGraphService
          .addChildInContext(this.contextId, familyId, this.contextId,
            FAMILY_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
      });

  }

  /**
   * Create a assembly part from a model
   * @param modelName
   * @param model
   */
  createPart(modelName: string, model: Autodesk.Viewing.Model) {
    this.getFamily(modelName)
      .then(family => {
        if (family) {
          const nodeId = SpinalGraphService.createNode(
            {
              name: modelName,
              urn: model.getData().urn,
              type: 'AssemblyPart'
            },
            undefined
          );
          SpinalGraphService.addChildInContext(family.id.get(), nodeId, this.contextId,
            PART_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE)
            .then(() => {
              // @ts-ignore
              AssemblyManagerService.mapNodeIdByModelId.set(model.id, nodeId);
              AssemblyManagerService.mapModelByPartId.set(nodeId, model);
              SpinalGraphService.getNode(nodeId).model = model;
            });
        } else
          this.createFamily(modelName)
            .then(() => {
              this.createPart(modelName, model)
            })
      })
  }

  /**
   * Load the model associated to the part
   * @param node {{urn: string}}
   */
  loadPart(node: { [key: string]: any, urn: string }) {
    // @ts-ignore
    return window.spinal.ForgeViewer.loadPart(node)
      .then(model => {
        AssemblyManagerService.mapNodeIdByModelId.set(model.id, node.id.get());
        AssemblyManagerService.mapModelByPartId.set(node.id.get(), model);
        node.modelId = model.id;
        return node.id.get()
      });
  }

  /**
   * Return the part associated to the modelId
   * @param modelId {number}
   */
  getPart(modelId: number) {
    return AssemblyManagerService.mapNodeIdByModelId.get(modelId);
  }

  /**
   * Create a new BIM obj from ad db id and a model
   * @param dbid
   * @param model
   */
  createBimObj(dbid: number, model: Autodesk.Viewing.Model) : Promise<SpinalNode> {
    return this.getBimObjectFromViewer(dbid, model)
      .then(bimObj => {

        if (bimObj)//bimObject already exist
          return;

        // @ts-ignore
        const partId = this.getPart(model.id);

        //TODO use external id instead
        const bimId = SpinalGraphService.createNode(
          {
            name: 'bimObject',
            dbId: dbid
          },
          undefined);

        return  SpinalGraphService.addChildInContext(partId, bimId, this.contextId,
          'hasBIMObjects', SPINAL_RELATION_LST_PTR_TYPE);
      });
   }

  /**
   * Return the bimobject associated to the dbid and model 
   * @param dbId {number}
   * @param model {Autodesk.Viewing.Model}
   */
  getBimObjectFromViewer( dbId :number, model: Autodesk.Viewing.Model ) : Promise<any> {
    // @ts-ignore
    const partId = this.getPart( model.id );
    return SpinalGraphService.getChildren( partId, ['hasBIMObjects'] )
      .then( children => {
        for (let i = 0; i < children.length; i++) {
          // @ts-ignore
          if (children.dbid.get() === dbId)
            return children;
        }
        return undefined;
      } )
  }

  /**
   * Get all the part of a family
   * @param familyId {string}
   */
  getParts( familyId ) : Promise<any[]>{
    return SpinalGraphService.getChildren( familyId, [PART_RELATION_NAME] )
  }


  /**
   * Get the transformation id associated to the part
   * @param partId {string}
   * @return {PromiseLike<string>}
   */
  getTransformId( partId : string ) : Promise<string> {
    return SpinalGraphService.getChildren( partId, [TRANSFORMATION_RELATION_NAME] )
      .then( children => {
        if (children.length > 0) {
          return children[0].id.get();
        }
        return null;
      } );
  }

  /**
   * Get the transformation associated to the part
   * @param partId {string}
   * @return {PromiseLike<string>}
   */
  getTransformation( partId : string ) : Promise<any> {
    return SpinalGraphService.getChildren( partId, [TRANSFORMATION_RELATION_NAME] )
      .then( children => {
        if (children.length > 0)
          return children[0];
      } )
  }

  /**
   * Create transformation for a part
   * @param partId {string}
   * @param transformation
   */
  createTransformation( partId : string, transformation:any ): Promise<SpinalNode> {
    const transformationId = SpinalGraphService
      .createNode( {
        type: 'transformation',
        partId: partId,
        transform: transformation
      } , undefined);
    return SpinalGraphService
      .addChild( partId, transformationId, TRANSFORMATION_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE );
  }

  /**
   * Modify a part transformation
   * @param partId
   * @param transform
   */
  //TODO create transformation model
  setTransform( partId : string, transform: any ) {
    this.getTransformId( partId )
      .then( transformId => {
        // @ts-ignore //TODO improve SpinalNodeRef Interface
        SpinalGraphService.modifyNode( transformId, { transform: transform } );
      } )
  }

  /**
   * Get all BIMObject associated to a part
   * @param partId
   */
  getBimObjects( partId: string ) : Promise<any>{
    return SpinalGraphService.getChildren( partId, ['hasBIMObjects'] )
  }

  /**
   * Return the model associated to the part
   * @param partId
   */
  getModel( partId ) {
    return AssemblyManagerService.mapModelByPartId.get( partId )
  }

  /**
   * Set the part transformation from a Three Transformation
   * @param partId
   * @param transform
   */
  async setTransformation( partId: string, transform: any ) {
    transform = this.normalize( transform );

    const nodeId :string  = await this.getTransformId( partId );

    //Create a new transformation if none exist
    if (!nodeId) {
      await this.createTransformation( partId, transform );
      return;
    }

    const node = SpinalGraphService.getNode( nodeId );

    const transformation = {};

    const keys = ['translate',  'rotate','scale'];
    for (let i = 0; i< keys.length; i++) {
      if (node.transform && node.transform.hasOwnProperty( keys[i] ))
        transformation[keys[i]] = node.transform[keys[i]].get();
      if (transform.hasOwnProperty( keys[i] ))
        transformation[keys[i]] = transform[keys[i]]
    }

    // @ts-ignore
    SpinalGraphService.modifyNode( nodeId, {
      transform: transformation
    } )
  }

  /**
   * transform a three transformation to a spinal object
   * @param transformation
   */
  normalize( transformation: any ) {
    const res = {};
    const keys = ['translate', 'rotate', 'scale'];
    for (let i = 0; i < keys.length; i++) {
      if (transformation.hasOwnProperty( keys[i] )) {
        res[keys[i]] = this._normalize(keys[i], transformation[keys[i]] )
      }
    }
    return res;
  }

  _normalize(name, obj){
    if (name === 'rotate')
      return this._euler2deg(obj);
    if (name === 'translate')
      return  this._vector3ToMap(obj);
    if (name === 'scale')
      return  this._vector3ToMap(obj);
  }

  _euler2deg(euler){
    if (euler.rad){
      const res = {x: 0, y:0, z:0};
      res.x = this._rad2Deg(euler.x);
      res.y = this._rad2Deg(euler.y);
      res.z = this._rad2Deg(euler.z);
      return res;
    }
    return euler;
  }

  _rad2Deg(nb){
    return nb / (Math.PI / 180);
  }

  _vector3ToMap(vec ) {
    const res = {};

    for (let key in vec) {
      if (vec.hasOwnProperty( key ))
        res[key] = vec[key];
    }
    return res;
  }
} 