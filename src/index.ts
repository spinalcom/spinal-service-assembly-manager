import {AssemblyManagerService} from "./AssemblyManagerService";
import {
  CONTEXT_NAME,
  PART_RELATION_NAME,
  TRANSFORMATION_RELATION_NAME,
  FAMILY_RELATION_NAME
} from './Constants'

const G_ROOT =  typeof window !== "undefined" ?  window : global;

if (!G_ROOT.spinal)
  G_ROOT.spinal = {};

if (!G_ROOT.spinal.assimblyManagerService){
  G_ROOT.spinal.assimblyManagerService = new AssemblyManagerService();
}
const assemblyManagerService =  G_ROOT.spinal.assimblyManagerService;
export { AssemblyManagerService, assemblyManagerService, CONTEXT_NAME, PART_RELATION_NAME, TRANSFORMATION_RELATION_NAME, FAMILY_RELATION_NAME}