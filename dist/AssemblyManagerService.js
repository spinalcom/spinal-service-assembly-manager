"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
const Constants_1 = require("./Constants");
class AssemblyManagerService {
    constructor() {
        this.context = spinal_env_viewer_graph_service_1.SpinalGraphService.getContext(Constants_1.CONTEXT_NAME);
        this.setContextId();
    }
    /**
     * set the contextId from the context if defined create the context otherwise
     */
    setContextId() {
        if (!this.context) {
            spinal_env_viewer_graph_service_1.SpinalGraphService.addContext(Constants_1.CONTEXT_NAME).then(context => {
                this.context = context;
                this.contextId = context.info.id.get();
            });
        }
        else {
            this.contextId = this.context.info.id.get();
        }
    }
    /**
     * Return the family with the given name
     * @param familyName
     * @return Promise<any>
     */
    getFamily(familyName) {
        //TODO export interface from Spinal Graph Service
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(this.contextId, [Constants_1.FAMILY_RELATION_NAME])
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
    createFamily(familyName) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(this.contextId, [Constants_1.FAMILY_RELATION_NAME])
            .then(children => {
            for (let i = 0; i < children.length; i++) {
                if (children[i].name.get() === familyName)
                    return;
            }
            const familyId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({ name: familyName }, undefined);
            return spinal_env_viewer_graph_service_1.SpinalGraphService
                .addChildInContext(this.contextId, familyId, this.contextId, Constants_1.FAMILY_RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE);
        });
    }
    /**
     * Create a assembly part from a model
     * @param modelName
     * @param model
     */
    createPart(modelName, model) {
        this.getFamily(modelName)
            .then(family => {
            if (family) {
                const nodeId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({
                    name: modelName,
                    urn: model.getData().urn,
                    type: 'AssemblyPart'
                }, undefined);
                spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(family.id.get(), nodeId, this.contextId, Constants_1.PART_RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE)
                    .then(() => {
                    // @ts-ignore
                    AssemblyManagerService.mapNodeIdByModelId.set(model.id, nodeId);
                    AssemblyManagerService.mapModelByPartId.set(nodeId, model);
                    spinal_env_viewer_graph_service_1.SpinalGraphService.getNode(nodeId).model = model;
                });
            }
            else
                this.createFamily(modelName)
                    .then(() => {
                    this.createPart(modelName, model);
                });
        });
    }
    /**
     * Load the model associated to the part
     * @param node {{urn: string}}
     */
    loadPart(node) {
        // @ts-ignore
        return window.spinal.ForgeViewer.loadPart(node)
            .then(model => {
            AssemblyManagerService.mapNodeIdByModelId.set(model.id, node.id.get());
            AssemblyManagerService.mapModelByPartId.set(node.id.get(), model);
            node.modelId = model.id;
            return node.id.get();
        });
    }
    /**
     * Return the part associated to the modelId
     * @param modelId {number}
     */
    getPart(modelId) {
        return AssemblyManagerService.mapNodeIdByModelId.get(modelId);
    }
    /**
     * Create a new BIM obj from ad db id and a model
     * @param dbid
     * @param model
     */
    createBimObj(dbid, model) {
        return this.getBimObjectFromViewer(dbid, model)
            .then(bimObj => {
            if (bimObj) //bimObject already exist
                return;
            // @ts-ignore
            const partId = this.getPart(model.id);
            //TODO use external id instead
            const bimId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({
                name: 'bimObject',
                dbId: dbid
            }, undefined);
            return spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(partId, bimId, this.contextId, 'hasBIMObjects', spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE);
        });
    }
    /**
     * Return the bimobject associated to the dbid and model
     * @param dbId {number}
     * @param model {Autodesk.Viewing.Model}
     */
    getBimObjectFromViewer(dbId, model) {
        // @ts-ignore
        const partId = this.getPart(model.id);
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(partId, ['hasBIMObjects'])
            .then(children => {
            for (let i = 0; i < children.length; i++) {
                // @ts-ignore
                if (children.dbid.get() === dbId)
                    return children;
            }
            return undefined;
        });
    }
    /**
     * Get all the part of a family
     * @param familyId {string}
     */
    getParts(familyId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(familyId, [Constants_1.PART_RELATION_NAME]);
    }
    /**
     * Get the transformation id associated to the part
     * @param partId {string}
     * @return {PromiseLike<string>}
     */
    getTransformId(partId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(partId, [Constants_1.TRANSFORMATION_RELATION_NAME])
            .then(children => {
            if (children.length > 0) {
                return children[0].id.get();
            }
            return null;
        });
    }
    /**
     * Get the transformation associated to the part
     * @param partId {string}
     * @return {PromiseLike<string>}
     */
    getTransformation(partId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(partId, [Constants_1.TRANSFORMATION_RELATION_NAME])
            .then(children => {
            if (children.length > 0)
                return children[0];
        });
    }
    /**
     * Create transformation for a part
     * @param partId {string}
     * @param transformation
     */
    createTransformation(partId, transformation) {
        const transformationId = spinal_env_viewer_graph_service_1.SpinalGraphService
            .createNode({
            type: 'transformation',
            partId: partId,
            transform: transformation
        }, undefined);
        return spinal_env_viewer_graph_service_1.SpinalGraphService
            .addChild(partId, transformationId, Constants_1.TRANSFORMATION_RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE);
    }
    /**
     * Modify a part transformation
     * @param partId
     * @param transform
     */
    //TODO create transformation model
    setTransform(partId, transform) {
        this.getTransformId(partId)
            .then(transformId => {
            // @ts-ignore //TODO improve SpinalNodeRef Interface
            spinal_env_viewer_graph_service_1.SpinalGraphService.modifyNode(transformId, { transform: transform });
        });
    }
    /**
     * Get all BIMObject associated to a part
     * @param partId
     */
    getBimObjects(partId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(partId, ['hasBIMObjects']);
    }
    /**
     * Return the model associated to the part
     * @param partId
     */
    getModel(partId) {
        return AssemblyManagerService.mapModelByPartId.get(partId);
    }
    /**
     * Set the part transformation from a Three Transformation
     * @param partId
     * @param transform
     */
    setTransformation(partId, transform) {
        return __awaiter(this, void 0, void 0, function* () {
            transform = this.normalize(transform);
            const nodeId = yield this.getTransformId(partId);
            //Create a new transformation if none exist
            if (!nodeId) {
                yield this.createTransformation(partId, transform);
                return;
            }
            const node = spinal_env_viewer_graph_service_1.SpinalGraphService.getNode(nodeId);
            const transformation = {};
            const keys = ['translate', 'rotate', 'scale'];
            for (let i = 0; i < keys.length; i++) {
                if (node.transform && node.transform.hasOwnProperty(keys[i]))
                    transformation[keys[i]] = node.transform[keys[i]].get();
                if (transform.hasOwnProperty(keys[i]))
                    transformation[keys[i]] = transform[keys[i]];
            }
            // @ts-ignore
            spinal_env_viewer_graph_service_1.SpinalGraphService.modifyNode(nodeId, {
                transform: transformation
            });
        });
    }
    /**
     * transform a three transformation to a spinal object
     * @param transformation
     */
    normalize(transformation) {
        const res = {};
        const keys = ['translate', 'rotate', 'scale'];
        for (let i = 0; i < keys.length; i++) {
            if (transformation.hasOwnProperty(keys[i])) {
                res[keys[i]] = this._normalize(keys[i], transformation[keys[i]]);
            }
        }
        return res;
    }
    _normalize(name, obj) {
        if (name === 'rotate')
            return this._euler2deg(obj);
        if (name === 'translate')
            return this._vector3ToMap(obj);
        if (name === 'scale')
            return this._vector3ToMap(obj);
    }
    _euler2deg(euler) {
        if (euler.rad) {
            const res = { x: 0, y: 0, z: 0 };
            res.x = this._rad2Deg(euler.x);
            res.y = this._rad2Deg(euler.y);
            res.z = this._rad2Deg(euler.z);
            return res;
        }
        return euler;
    }
    _rad2Deg(nb) {
        return nb / (Math.PI / 180);
    }
    _vector3ToMap(vec) {
        const res = {};
        for (let key in vec) {
            if (vec.hasOwnProperty(key))
                res[key] = vec[key];
        }
        return res;
    }
}
AssemblyManagerService.mapNodeIdByModelId = new Map();
AssemblyManagerService.mapModelByPartId = new Map();
exports.AssemblyManagerService = AssemblyManagerService;
//# sourceMappingURL=AssemblyManagerService.js.map