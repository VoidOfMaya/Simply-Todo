
import { ProjectManager } from "./modules/ProjectManager";
import { TaskManager } from "./modules/TaskManager";

console.log(`project is live`);
/* additional consideratuibs
  => set a default project where tasks without a project go
  =>archived tasks handling with an invalid projID
*/

const projectHandler = new ProjectManager();
const taskHandler = new TaskManager();

/*demo projects */
if (projectHandler.data.load("proj") === null){
  projectHandler.addProject(`urgent`);
  projectHandler.addProject('upcoming');
  projectHandler.addProject(`non urgent`);

}

//demo tasks.
if(taskHandler.data.load("tasks")=== null){
/* taskformat: addtask('name','info','due date','priority','project id') */
  taskHandler.addTask(`pay bank`,'', `28-06-2025`, '', '0');
  taskHandler.addTask(`walk dog`,'', `28-06-2025`, '', '0');
  taskHandler.addTask(`go to birthday`,'', `28-06-2025`, '', '1');
  taskHandler.addTask(`fix toilet`,'', `28-06-2025`, '', '2');

}
//alocate task to relavent project
const projectOne = projectHandler.getProject(0);
const tastOne = taskHandler.getTasks(0);
projectHandler.getProject(1);
//projectHandler.getTasks(1);
projectHandler.getProject(2);
//projectHandler.getTasks(2);
projectHandler.getProject(3);
//projectHandler.getTasks(3);

console.log(projectOne);
console.log(tastOne);






