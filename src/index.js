import { Project } from "./modules/Project";
import { ProjectManager } from "./modules/ProjectManager";
import { Task } from "./modules/Todo";

console.log(`project is live`);

/*demo projects */
const priorityOne = new Project (`urgent`);
const priorityTwo = new Project ('upcoming');
const priorityThree = new Project('non urgent');

/*demo tasks */
const todoOne = new Task(`pay bank`,'', `28-06-2025`, '', '');
const todoTwo = new Task(`walk dog`,'', `28-06-2025`, '', '');
const todoThree = new Task(`go to birthday`,'', `28-06-2025`, '', '');
const todoFour = new Task(`fix toilet`,'', `28-06-2025`, '', '');


