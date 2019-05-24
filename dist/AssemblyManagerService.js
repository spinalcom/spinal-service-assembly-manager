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
const dist_1 = require("../../spinal-service-models-manager/dist");
const BIM_OBJECT_RELATION_NAME = "hasBIMObject";
class AssemblyManagerService {
    constructor() {
        this.initialized = false;
        this.initialized = this.init();
        this.modelManager = dist_1.default;
        this.modelManager.waitForInitialize()
            .then(() => {
            this.modelManager.on('rotate', (e) => {
                this.onRotation(e);
            });
            this.modelManager.on('translate', (e) => {
                this.onTranslate(e);
            });
            this.isInitialized().then(() => {
                this.autoLoadPart();
            });
        });
    }
    isInitialized() {
        return this.initialized;
    }
    /**
     * set the contextId from the context if defined create the context otherwise
     */
    init() {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.waitForInitialization()
            .then(() => {
            this.context = spinal_env_viewer_graph_service_1.SpinalGraphService.getContext(Constants_1.CONTEXT_NAME);
            if (!this.context) {
                return spinal_env_viewer_graph_service_1.SpinalGraphService.addContext(Constants_1.CONTEXT_NAME)
                    .then(context => {
                    this.context = context;
                    this.contextId = context.info.id.get();
                    return true;
                });
            }
            else {
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
    autoLoadPart() {
        if (this.contextId)
            return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(this.contextId, [Constants_1.FAMILY_RELATION_NAME])
                .then(families => {
                const autoLoadingFamilies = [];
                const autoLoadingPart = [];
                for (let i = 0; i < families.length; i++) {
                    if (families[i].autoLoad)
                        autoLoadingFamilies.push(families[i].id.get());
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
                        if (parts[i][j].autoLoad.get()
                            && !parts[i][j].loaded) {
                            const part = parts[i][j];
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
                .catch(e => { console.error(e); });
        return Promise.resolve();
    }
    /**
     * Return the family with the given name
     * @param familyName
     * @return Promise<any>
     */
    getFamily(familyName) {
        if (!this.contextId) {
            this.context = spinal_env_viewer_graph_service_1.SpinalGraphService.getContext(Constants_1.CONTEXT_NAME);
            this.contextId = this.context.info.id.get();
        }
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
            const familyId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({
                name: familyName,
                autoLoad: false
            }, undefined);
            return spinal_env_viewer_graph_service_1.SpinalGraphService
                .addChildInContext(this.contextId, familyId, this.contextId, Constants_1.FAMILY_RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE);
        });
    }
    /**
     * Create a assembly part from a model
     * @param modelName
     * @param model
     * @param thumbnail
     */
    createPart(modelName, model, thumbnail) {
        return this.getFamily(modelName)
            .then(family => {
            if (family) {
                const nodeId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({
                    name: modelName,
                    urn: model.getData().urn,
                    type: 'AssemblyPart',
                    familyId: family.id.get(),
                    autoLoad: false,
                    thumbnail
                }, undefined);
                return spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(family.id.get(), nodeId, this.contextId, Constants_1.PART_RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE)
                    .then((node) => {
                    // @ts-ignore
                    AssemblyManagerService.mapNodeIdByModelId.set(model.id, nodeId);
                    AssemblyManagerService.mapModelByPartId.set(nodeId, model);
                    this.modelManager.setPartId(nodeId, model.id);
                    spinal_env_viewer_graph_service_1.SpinalGraphService.getNode(nodeId).model = model;
                    return nodeId;
                });
            }
            else
                return this.createFamily(modelName)
                    .then(() => {
                    this.createPart(modelName, model, thumbnail);
                });
        });
    }
    /**
     * Load the model associated to the part
     * @param node {{urn: string}}
     */
    loadPart(node) {
        // @ts-ignore
        return this.modelManager.loadModel(node.urn.get(), node.id.get())
            .then((model) => {
            AssemblyManagerService.mapNodeIdByModelId.set(model.modelId, node.id.get());
            AssemblyManagerService.mapModelByPartId.set(node.id.get(), model);
            node.modelId = model.modelId;
            return this.getTransformation(node.id.get())
                .then(transformation => {
                if (transformation) {
                    this.modelManager.transformModel(model.modelId, transformation.transform);
                }
                return node.id.get();
            });
        }).catch(console.error);
    }
    /**
     * Return the part associated to the modelId
     * @param modelId {number}
     */
    getPart(modelId) {
        return this.modelManager.getPartId(modelId);
    }
    /**
     * Create a new BIM obj from ad db id and a model
     * @param dbid
     * @param model
     */
    createBimObj(dbid, name, model) {
        return this.getBimObjectFromViewer(dbid, model)
            .then(bimObj => {
            if (bimObj && bimObj.length > 0) { //bimObject already exist
                return;
            }
            // @ts-ignore
            const partId = this.getPart(model.id);
            //TODO use external id instead
            const bimId = spinal_env_viewer_graph_service_1.SpinalGraphService.createNode({
                name: name,
                dbid: dbid,
                type: 'BIMObject'
            }, undefined);
            return spinal_env_viewer_graph_service_1.SpinalGraphService.addChildInContext(partId, bimId, this.contextId, BIM_OBJECT_RELATION_NAME, spinal_env_viewer_graph_service_1.SPINAL_RELATION_LST_PTR_TYPE);
        }).catch(e => {
            console.error(e);
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
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(partId, [BIM_OBJECT_RELATION_NAME])
            .then(children => {
            for (let i = 0; i < children.length; i++) {
                // @ts-ignore
                if (children[i].dbid.get() === dbId) {
                    return children[i];
                }
            }
            return Promise.resolve(undefined);
        });
    }
    setAutoLoad(partId, autoload) {
        spinal_env_viewer_graph_service_1.SpinalGraphService.getNodeAsync(partId)
            .then(part => {
            spinal_env_viewer_graph_service_1.SpinalGraphService.modifyNode(partId, { autoLoad: autoload });
            spinal_env_viewer_graph_service_1.SpinalGraphService.modifyNode(part.familyId, { autoLoad: autoload });
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
        this.getTransformation(partId)
            .then(transformation => {
            // @ts-ignore //TODO improve SpinalNodeRef Interface
            spinal_env_viewer_graph_service_1.SpinalGraphService.modifyNode(transformation.id.get(), { transform: transform });
        });
    }
    setTranslate(partId, translation) {
        return this.getTransformation(partId)
            .then(transformation => {
            if (!transformation) {
                this.createTransformation(partId, { translate: translation });
            }
            else {
                const transform = transformation.transform.get();
                transform.translate = translation;
                this.setTransform(partId, transform);
            }
        });
    }
    setRotation(partId, rotation) {
        return this.getTransformation(partId)
            .then(transformation => {
            if (!transformation) {
                this.createTransformation(partId, { rotate: rotation });
            }
            else {
                const transform = transformation.transform.get();
                transform.rotate = rotation;
                this.setTransform(partId, transform);
            }
        });
    }
    /**
     * Get all BIMObject associated to a part
     * @param partId
     */
    getBimObjects(partId) {
        return spinal_env_viewer_graph_service_1.SpinalGraphService.getChildren(partId, [BIM_OBJECT_RELATION_NAME]);
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
            const node = yield this.getTransformation(partId);
            //Create a new transformation if none exist
            if (!node) {
                yield this.createTransformation(partId, transform);
                return;
            }
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
    _getCurrentPartId() {
        return this.getPart(window.spinal.ForgeViewer.viewer.model.id);
    }
    _getCurrentModel() {
        return window.spinal.ForgeViewer.viewer.model;
    }
    _getViewer() {
        return window.spinal.ForgeViewer.viewer;
    }
    _setCurrentModel(model) {
        return new Promise(resolve => {
            AssemblyManagerService._getViewer().impl.model = model;
            var propertyPanel = AssemblyManagerService._getViewer().getPropertyPanel(true);
            propertyPanel.currentModel = model;
            model.getObjectTree(instanceTree => {
                AssemblyManagerService._getViewer().modelstructure.setModel(instanceTree);
                resolve();
            });
        });
    }
}
AssemblyManagerService.mapNodeIdByModelId = new Map();
AssemblyManagerService.mapModelByPartId = new Map();
AssemblyManagerService.init = false;
exports.AssemblyManagerService = AssemblyManagerService;
//# sourceMappingURL=AssemblyManagerService.js.map