
import { ProjectManager } from "./modules/ProjectManager";
import { TaskManager } from "./modules/TaskManager"; 
import { init, initDialogP, initSideBare , renderSide} from "./modules/domManager";
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
  init();
  initSideBare(projectHandler.showProjects(), projectHandler.deletProject.bind(projectHandler));
  initDialogP(projectHandler.addProject.bind(projectHandler));
 
  staticDom.dialog_CPD.addEventListener('close', ()=>{
    renderSide(projectHandler.showProjects(), projectHandler.deletProject.bind(projectHandler));
  }) 
  staticDom.dialog_dPD.addEventListener('close', ()=>{
    renderSide(projectHandler.showProjects(), projectHandler.deletProject.bind(projectHandler));
  }) 
}


initApp()




