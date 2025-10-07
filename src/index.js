
import "./styles.css";
import { ProjectManager } from "./modules/ProjectManager";
import { TaskManager } from "./modules/TaskManager"; 
import { init, initDialogP, initMain, initSideBare , renderSide} from "./modules/domManager";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { staticDom } from "./modules/staticDom";
import { Project } from "./modules/Project";

console.log(`project is live`);
/* additional consideratuibs
  => set a default project where tasks without a project go
  =>archived tasks handling with an invalid projID
*/

const projectHandler = new ProjectManager();
const taskHandler = new TaskManager();

// passing binded arguments
const projectAdd = projectHandler.deletProject.bind(projectHandler);
const projectDelete = projectHandler.deletProject.bind(projectHandler)
const tasksGet = taskHandler.getTasks.bind(taskHandler);
/*demo projects */
if (projectHandler.data.load("proj") === null){
  projectHandler.addProject(`urgent`);
  projectHandler.addProject('upcoming');
  projectHandler.addProject(`non urgent`);
  projectHandler.addProject('home');

}

//demo tasks.
if(taskHandler.data.load("tasks")=== null){
/* taskformat: addtask('name','info','due date','priority','project id') */
  taskHandler.addTask(`pay bank`,'', `28-06-2025`, '', '0');
  taskHandler.addTask(`walk dog`,'', `28-06-2025`, '', '0');
  taskHandler.addTask(`go to birthday`,'', `28-06-2025`, '', '1');
  taskHandler.addTask(`fix toilet`,'', `28-06-2025`, '', '2');

}
const savedProjects = projectHandler.showProjects();
const maxId = savedProjects.reduce((max, proj) => Math.max(max, proj.id), -1);
console.log(maxId)
Project.setStartingId(maxId + 1);
function initApp(){
  init(projectHandler.getProject(3));
  initSideBare(projectHandler.showProjects(), projectDelete, tasksGet);
  initDialogP(projectAdd);
 
  staticDom.dialog_CPD.addEventListener('close', ()=>{
    renderSide(projectHandler.showProjects(), projectDelete, tasksGet);
  }) 
  staticDom.dialog_dPD.addEventListener('close', ()=>{
    renderSide(projectHandler.showProjects(), projectDelete, tasksGet);
  }) 
}


initApp()




