import {
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalContext,
  SpinalGraphService,
  SpinalNode
} from "spinal-env-viewer-graph-service";
import {
  BIM_OBJECT_RELATION_NAME, BIM_OBJECT_RELATION_TYPE,
  CONTEXT_NAME, FAMILY_RELATION_NAME,
  PART_RELATION_NAME, REFERENCE_OBJECT_RELATION_NAME,
  TRANSFORMATION_RELATION_NAME
} from "./Constants";
import ModelsManagerService
  from "../../spinal-service-models-manager/dist";
import { ModelMetaData } from "../../spinal-service-models-manager/declarations";

import * as debounce from 'debounce';

export class AssemblyManagerService {

  public context: SpinalContext;
  public contextId: string;
  public static mapNodeIdByModelId: Map<number, string> = new Map();
  public static mapModelByPartId: Map<string, Autodesk.Viewing.Model> = new Map();
  public initialized: Promise<boolean> = false;
  public static init: any = false;
  public modelManager: ModelsManagerService;

  constructor() {
    this.initialized = this.init();
    this.modelManager = ModelsManagerService;
    this.modelManager.waitForInitialize()
      .then(() => {
        this.modelManager.on('rotate', (e) => {
          this.onRotation(e);
        });
        this.modelManager.on('translate', (e) => {
          this.onTranslate(e);
        });
        this.isInitialized().then(()=> {
          this.autoLoadPart();
        })
      });
  }

  isInitialized(): Promise<boolean> {
    return this.initialized;
  }

  /**
   * set the contextId from the context if defined create the context otherwise
   */
  init(): Promise<boolean> {
    return SpinalGraphService.waitForInitialization()
      .then(() => {
        this.context = SpinalGraphService.getContext(CONTEXT_NAME);
        if (!this.context) {
          return SpinalGraphService.addContext(CONTEXT_NAME)
            .then(context => {
              this.context = context;
              this.contextId = context.info.id.get();
              return true;
            })
        } else {
          this.contextId = this.context.info.id.get();
          return true;
        }
      });
  }

  onTranslate(modelId) {
    const model = this.modelManager.modelsMetas[modelId];
    this.setTranslate(model.partId, model.getTranslation());
  }

  onRotation(modelId) {
    const model = this.modelManager.modelsMetas[modelId];
    this.setRotation(model.partId, model.getRotation());
  }


  autoLoadPart(): Promise<any> {
    if (this.contextId)
      return SpinalGraphService.getChildren(this.contextId, [FAMILY_RELATION_NAME])
        .then(families => {
          const autoLoadingFamilies = [];
          const autoLoadingPart = [];
          for (let i = 0; i < families.length; i++) {
            if (families[i].autoLoad)

              autoLoadingFamilies.push(families[i].id.get())
          }
          for (let i = 0; i < autoLoadingFamilies.length; i++) {
            autoLoadingPart.push(this.getParts(autoLoadingFamilies[i]));
          }
          return Promise.all(autoLoadingPart);
        })
        .then(parts => {
          const proms = [];
          for (let i = 0; i < parts.length; i++) {
            for (let j = 0; j < parts[i].length; j++) {
              if (
                parts[i][j].autoLoad.get()
                && !parts[i][j].loaded
              ) {
                const part  = parts[i][j];
                part.loaded = true;
                proms.push(this.loadPart(part));
              }
            }
          }
          //wait for the model to be loaded before returning
          return Promise.all(proms)
            .then((res) => {
              return res;
            }).catch(e => {
              console.error(e);
            });
        })
        .catch(e => {console.error(e)})
        ;
    return Promise.resolve();
  }

  /**
   * Return the family with the given name
   * @param familyName
   * @return Promise<any>
   */
  getFamily(familyName: string): Promise<any> {
    if (!this.contextId) {
      this.context = SpinalGraphService.getContext(CONTEXT_NAME);
      this.contextId = this.context.info.id.get();
    }
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

        const familyId = SpinalGraphService.createNode({
          name: familyName,
          autoLoad: false
        }, undefined);

        return SpinalGraphService
          .addChildInContext(this.contextId, familyId, this.contextId,
            FAMILY_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
      });

  }

  /**
   * Create a assembly part from a model
   * @param modelName
   * @param model
   * @param thumbnail
   */
  createPart(modelName: string, model: Autodesk.Viewing.Model, thumbnail: string) {
    return this.getFamily(modelName)
      .then(family => {
        if (family) {
          const nodeId = SpinalGraphService.createNode(
            {
              name: modelName,
              urn: model.getData().urn,
              type: 'AssemblyPart',
              familyId: family.id.get(),
              autoLoad: false,
              thumbnail
            },
            undefined
          );

          return SpinalGraphService.addChildInContext(family.id.get(), nodeId, this.contextId,
            PART_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE)
            .then((node) => {
              // @ts-ignore
              AssemblyManagerService.mapNodeIdByModelId.set(model.id, nodeId);
              AssemblyManagerService.mapModelByPartId.set(nodeId, model);
              this.modelManager.setPartId(nodeId, model.id);
              SpinalGraphService.getNode(nodeId).model = model;
              return nodeId;
            });
        } else
          return this.createFamily(modelName)
            .then(() => {
              this.createPart(modelName, model, thumbnail)
            })
      })
  }

  /**
   * Load the model associated to the part
   * @param node {{urn: string}}
   */
  loadPart(node: { [key: string]: any, urn: string }) {
    // @ts-ignore
    return this.modelManager.loadModel(node.urn.get(), node.id.get())
      .then((model: ModelMetaData) => {
        AssemblyManagerService.mapNodeIdByModelId.set(model.modelId, node.id.get());
        AssemblyManagerService.mapModelByPartId.set(node.id.get(), model);
        node.modelId = model.modelId;
        return this.getTransformation(node.id.get())
          .then(transformation => {
            if (transformation) {
              this.modelManager.transformModel(model.modelId, transformation.transform);
            }

            return node.id.get()
          });
      }).catch(console.error);
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
  createBimObj(dbid: number, name: string, model: Autodesk.Viewing.Model): Promise<SpinalNode> {
    return this.getBimObjectFromViewer(dbid, model)
      .then(bimObj => {


          if (bimObj && bimObj.length > 0) {  //bimObject already exist
            return;
          }

          // @ts-ignore
          const partId = this.getPart(model.id);

          //TODO use external id instead
          const bimId = SpinalGraphService.createNode(
            {
              name: name,
              dbId: dbid,
              type: 'BIMObject'
            },
            undefined);
          return SpinalGraphService.addChildInContext(partId, bimId, this.contextId,
            BIM_OBJECT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
        }
      ).catch(e => {
        console.error(e);
      })
      ;
  }

  /**
   * Return the bimobject associated to the dbid and model
   * @param dbId {number}
   * @param model {Autodesk.Viewing.Model}
   */
  getBimObjectFromViewer(dbId: number, model: Autodesk.Viewing.Model): Promise<any> {
    // @ts-ignore
    const partId = this.getPart(model.id);
    return SpinalGraphService.getChildren(partId, [BIM_OBJECT_RELATION_NAME])
      .then(children => {
        for (let i = 0; i < children.length; i++) {
          // @ts-ignore
          if (children[i].dbId.get() === dbId) {
            return children[i];
          }
        }
        return Promise.resolve(undefined);
      })
  }

  setAutoLoad(partId, autoload) {
    SpinalGraphService.getNodeAsync(partId)
      .then(part => {
        SpinalGraphService.modifyNode(partId, {autoLoad: autoload});
        SpinalGraphService.modifyNode(part.familyId, {autoLoad: autoload})
      })

  }

  /**
   * Get all the part of a family
   * @param familyId {string}
   */
  getParts(familyId): Promise<any[]> {
    return SpinalGraphService.getChildren(familyId, [PART_RELATION_NAME])
  }


  /**
   * Get the transformation associated to the part
   * @param partId {string}
   * @return {PromiseLike<string>}
   */
  getTransformation(partId: string): Promise<any> {
    return SpinalGraphService.getChildren(partId, [TRANSFORMATION_RELATION_NAME])
      .then(children => {
        if (children.length > 0)
          return children[0];
      })
  }

  /**
   * Create transformation for a part
   * @param partId {string}
   * @param transformation
   */
  createTransformation(partId: string, transformation: any): Promise<SpinalNode> {
    const transformationId = SpinalGraphService
      .createNode({
        type: 'transformation',
        partId: partId,
        transform: transformation
      }, undefined);
    return SpinalGraphService
      .addChild(partId, transformationId, TRANSFORMATION_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
  }

  /**
   * Modify a part transformation
   * @param partId
   * @param transform
   */
  //TODO create transformation model
  setTransform(partId: string, transform: any) {
    this.getTransformation(partId)
      .then(transformation => {
        // @ts-ignore //TODO improve SpinalNodeRef Interface
        SpinalGraphService.modifyNode(transformation.id.get(), {transform: transform});
      })
  }

  setTranslate(partId, translation) {
    return this.getTransformation(partId)
      .then(transformation => {
        if (!transformation) {
          this.createTransformation(partId, {translate: translation});
        } else {
          const transform = transformation.transform.get();
          transform.translate = translation;
          this.setTransform(partId, transform);
        }
      })
  }

  setRotation(partId, rotation) {
    return this.getTransformation(partId)
      .then(transformation => {
        if (!transformation) {
          this.createTransformation(partId, {rotate: rotation});
        } else {
          const transform = transformation.transform.get();
          transform.rotate = rotation;
          this.setTransform(partId, transform);
        }
      })
  }

  /**
   * Get all BIMObject associated to a part
   * @param partId
   */
  getBimObjects(partId: string): Promise<any> {
    return SpinalGraphService.getChildren(partId, [BIM_OBJECT_RELATION_NAME])
  }

  /**
   * Return the model associated to the part
   * @param partId
   */
  getModel(partId) {
    return AssemblyManagerService.mapModelByPartId.get(partId)
  }

  /**
   * Set the part transformation from a Three Transformation
   * @param partId
   * @param transform
   */
  async setTransformation(partId: string, transform: any) {

    const node: string = await this.getTransformation(partId);


    //Create a new transformation if none exist
    if (!node) {
      await this.createTransformation(partId, transform);
      return;
    }


    const transformation = {};

    const keys = ['translate', 'rotate', 'scale'];
    for (let i = 0; i < keys.length; i++) {
      if (node.transform && node.transform.hasOwnProperty(keys[i]))
        transformation[keys[i]] = node.transform[keys[i]].get();
      if (transform.hasOwnProperty(keys[i]))
        transformation[keys[i]] = transform[keys[i]]
    }

    // @ts-ignore
    SpinalGraphService.modifyNode(nodeId, {
      transform: transformation
    })
  }


  _getCurrentPartId() {
    return this.getPart(window.spinal.ForgeViewer.viewer.model.id);
  }

  static _getCurrentModel() {
    return window.spinal.ForgeViewer.viewer.model;
  }

  static _getViewer() {
    return window.spinal.ForgeViewer.viewer;
  }

  static _setCurrentModel(model: Autodesk.Viewing.Model) {
    return new Promise(resolve => {
      AssemblyManagerService._getViewer().model = model;
      var propertyPanel = AssemblyManagerService._getViewer().getPropertyPanel(true);
      propertyPanel.currentModel = model;
      model.getObjectTree(instanceTree => {
        AssemblyManagerService._getViewer().modelstructure.setModel(instanceTree);
        resolve();
      });
    });
  }
}