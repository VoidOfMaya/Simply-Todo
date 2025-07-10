
import { Task } from "./Todo";
import { Project } from "./Project";
class ProjectManager{
    
    #projects = [];
    tasksList = [];
    constructor(){
        
        
    }
    //project C.R.U.D
    addProject(projectName){
        const newProject = new Project(projectName);
        this.#projects.push(newProject.JSONFormat());
        
    }
    // task C.R.U.D
    addTask(name, info, date, priority, projID){
        const newTask = new Task(name, info, date, priority, projID);
        this.tasksList.push(newTask.JSONFormat());

    }
    showProjects(){
        console.log(`current projects:`);
        console.log(this.#projects);
    }
    showTasks(){
        console.log(`current Tasks:`);
        console.log(this.tasksList);
    }
}

/* what this does:
-single resposibility: sort tasks to their respective projcects
-gets projects 
-inputs them to an array
-gets tasks
-inputs them to an array
-sort a new array using the commom project id for each project and  task
-spit out array for each project with an array of tasks
*/
export{
    ProjectManager,
}


/*demo tasks */
//const todoOne = new Task(`pay bank`,'', `28-06-2025`, '', '');
//const todoTwo = new Task(`walk dog`,'', `28-06-2025`, '', '');
//const todoThree = new Task(`go to birthday`,'', `28-06-2025`, '', '');
//const todoFour = new Task(`fix toilet`,'', `28-06-2025`, '', '');


/*demo project manager */

