
import { ProjectManager } from "./modules/ProjectManager";

console.log(`project is live`);


const projectHandler = new ProjectManager();

/*demo projects */
if (projectHandler.data.load("proj") === null){
  projectHandler.addProject(`urgent`);
  projectHandler.addProject('upcoming');
  projectHandler.addProject(`non urgent`);

}

  projectHandler.updateProject(1, "not so upcoming");

//demo tasks.
if(projectHandler.data.load("tasks")=== null){
/* taskformat: addtask('name','info','due date','priority','project id') */
  projectHandler.addTask(`pay bank`,'', `28-06-2025`, '', '0');
  projectHandler.addTask(`walk dog`,'', `28-06-2025`, '', '0');
  projectHandler.addTask(`go to birthday`,'', `28-06-2025`, '', '1');
  projectHandler.addTask(`fix toilet`,'', `28-06-2025`, '', '2');

}
//alocate task to relavent project
const projectOne = projectHandler.getProject(0);
const tastOne = projectHandler.getTasks(0);
projectHandler.getProject(1);
//projectHandler.getTasks(1);
projectHandler.getProject(2);
//projectHandler.getTasks(2);
projectHandler.getProject(3);
//projectHandler.getTasks(3);

console.log(projectOne);
console.log(tastOne);

;





