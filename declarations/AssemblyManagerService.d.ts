/// <reference types="forge-viewer" />
import { SpinalContext, SpinalNode } from "spinal-env-viewer-graph-service";
export declare class AssemblyManagerService {
    context: SpinalContext;
    contextId: string;
    static mapNodeIdByModelId: Map<number, string>;
    static mapModelByPartId: Map<string, Autodesk.Viewing.Model>;
    constructor();
    /**
     * set the contextId from the context if defined create the context otherwise
     */
    setContextId(): void;
    /**
     * Return the family with the given name
     * @param familyName
     * @return Promise<any>
     */
    getFamily(familyName: string): Promise<any>;
    /**
     * Create a new family in the assembly
     * @param familyName string
     * @return {Promise<SpinalNode>} return the newly family node created
     */
    createFamily(familyName: string): Promise<SpinalNode>;
    /**
     * Create a assembly part from a model
     * @param modelName
     * @param model
     */
    createPart(modelName: string, model: Autodesk.Viewing.Model): void;
    /**
     * Load the model associated to the part
     * @param node {{urn: string}}
     */
    loadPart(node: {
        [key: string]: any;
        urn: string;
    }): any;
    /**
     * Return the part associated to the modelId
     * @param modelId {number}
     */
    getPart(modelId: number): string;
    /**
     * Create a new BIM obj from ad db id and a model
     * @param dbid
     * @param model
     */
    createBimObj(dbid: number, model: Autodesk.Viewing.Model): Promise<SpinalNode>;
    /**
     * Return the bimobject associated to the dbid and model
     * @param dbId {number}
     * @param model {Autodesk.Viewing.Model}
     */
    getBimObjectFromViewer(dbId: number, model: Autodesk.Viewing.Model): Promise<any>;
    /**
     * Get all the part of a family
     * @param familyId {string}
     */
    getParts(familyId: any): Promise<any[]>;
    /**
     * Get the transformation id associated to the part
     * @param partId {string}
     * @return {PromiseLike<string>}
     */
    getTransformId(partId: string): Promise<string>;
    /**
     * Get the transformation associated to the part
     * @param partId {string}
     * @return {PromiseLike<string>}
     */
    getTransformation(partId: string): Promise<any>;
    /**
     * Create transformation for a part
     * @param partId {string}
     * @param transformation
     */
    createTransformation(partId: string, transformation: any): Promise<SpinalNode>;
    /**
     * Modify a part transformation
     * @param partId
     * @param transform
     */
    setTransform(partId: string, transform: any): void;
    /**
     * Get all BIMObject associated to a part
     * @param partId
     */
    getBimObjects(partId: string): Promise<any>;
    /**
     * Return the model associated to the part
     * @param partId
     */
    getModel(partId: any): Autodesk.Viewing.Model;
    /**
     * Set the part transformation from a Three Transformation
     * @param partId
     * @param transform
     */
    setTransformation(partId: string, transform: any): Promise<void>;
    /**
     * transform a three transformation to a spinal object
     * @param transformation
     */
    normalize(transformation: any): {};
    _normalize(name: any, obj: any): any;
    _euler2deg(euler: any): any;
    _rad2Deg(nb: any): number;
    _vector3ToMap(vec: any): {};
}
