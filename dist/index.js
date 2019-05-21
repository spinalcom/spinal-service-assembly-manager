"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AssemblyManagerService_1 = require("./AssemblyManagerService");
exports.AssemblyManagerService = AssemblyManagerService_1.AssemblyManagerService;
const Constants_1 = require("./Constants");
exports.CONTEXT_NAME = Constants_1.CONTEXT_NAME;
exports.PART_RELATION_NAME = Constants_1.PART_RELATION_NAME;
exports.TRANSFORMATION_RELATION_NAME = Constants_1.TRANSFORMATION_RELATION_NAME;
exports.FAMILY_RELATION_NAME = Constants_1.FAMILY_RELATION_NAME;
const G_ROOT = typeof window !== "undefined" ? window : global;
if (!G_ROOT.spinal)
    G_ROOT.spinal = {};
if (!G_ROOT.spinal.assimblyManagerService) {
    G_ROOT.spinal.assimblyManagerService = new AssemblyManagerService_1.AssemblyManagerService();
}
const assemblyManagerService = G_ROOT.spinal.assimblyManagerService;
exports.assemblyManagerService = assemblyManagerService;
//# sourceMappingURL=index.js.map