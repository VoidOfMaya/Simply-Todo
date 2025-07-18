
import { ProjectManager } from "./modules/ProjectManager";

console.log(`project is live`);


const projectHandler = new ProjectManager();

/*demo projects */
if (projectHandler.data.load("proj") === null){
  projectHandler.addProject(`urgent`);
  projectHandler.addProject('upcoming');
  projectHandler.addProject(`non urgent`);
}



/*demo tasks.
  taskformat: addtask('name','info','due date','priority','project id') */
if(projectHandler.data.load("tasks")=== null){
  projectHandler.addTask(`pay bank`,'', `28-06-2025`, '', '0');
  projectHandler.addTask(`walk dog`,'', `28-06-2025`, '', '0');
  projectHandler.addTask(`go to birthday`,'', `28-06-2025`, '', '1');
  projectHandler.addTask(`fix toilet`,'', `28-06-2025`, '', '2');

}
projectHandler.getProject(0);
projectHandler.getProject(1);
projectHandler.getProject(2);
projectHandler.getProject(3);


//projectHandler.alocateTasks(1, 2);
//projectHandler.alocateTasks(0, 0);
//projectHandler.alocateTasks(2, 1);
//projectHandler.alocateTasks(3, 1);



//projectHandler.showTasks();