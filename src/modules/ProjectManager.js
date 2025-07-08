
import { Task } from "./Todo";
import { Project } from "./Project";
class ProjectManager{
    
    #projects = [];
    tasks = [];
    constructor(){
        
        
    }
    //project C.R.U.D
    addProject(projectName){
        const projectObject = new Project(projectName);
        this.#projects.push(projectObject);
        console.log(`current projects:`);
        console.log(`${projectObject}`);
    }
    // task C.R.U.D
    addTask(task){
        this.tasks.push(task);
        console.log(`current tasks:`);
        console.log(`${this.tasks}`);
    }

    viewAllTasks(project){
        console.log(`Current tasks in project ${project.projectName}`)
        tasks.forEach(task => {
            
            console.log(task.title)
        });
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

