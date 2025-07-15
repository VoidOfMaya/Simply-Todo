
import { ProjectManager } from "./modules/ProjectManager";

console.log(`project is live`);


const projectHandler = new ProjectManager();

/*demo projects */
projectHandler.addProject(`urgent`);
projectHandler.addProject('upcoming');
projectHandler.addProject(`non urgent`);



/*demo tasks.
  taskformat: addtask('name','info','due date','priority','project id') */
//projectHandler.addTask(`pay bank`,'', `28-06-2025`, '', '');
//projectHandler.addTask(`walk dog`,'', `28-06-2025`, '', '');
//projectHandler.addTask(`go to birthday`,'', `28-06-2025`, '', '');
//projectHandler.addTask(`fix toilet`,'', `28-06-2025`, '', '');

//projectHandler.showProjects();


//projectHandler.alocateTasks(1, 2);
//projectHandler.alocateTasks(0, 0);
//projectHandler.alocateTasks(2, 1);
//projectHandler.alocateTasks(3, 1);

projectHandler.readProject(0);

//projectHandler.showTasks();