import { Project } from "./modules/ProjectManager";
import { Task } from "./modules/Todo";

const proj1 = new Project('priority lvl 1');
console.log(`project name: ${proj1.projectName}`);
const proj2 = new Project('priority lvl 2');
console.log(`project name: ${proj2.projectName}`);
const proj3 = new Project('priority lvl 3');
console.log(`project name: ${proj3.projectName}`);
console.log(`this funciton is running proper`);

