
import { Task } from "./Todo";
import { Project } from "./Project";
import { Storage } from "./Storage";
class ProjectManager{
    
    #projects = [];
    tasksList = [];
    data = new Storage();
    constructor(){
        
        
    }
    //project C.R.U.D
    addProject(projectName){
        const newProject = new Project(projectName);
        //this.#projects.push(newProject.JSONFormat());
        this.data.save(newProject.Id, newProject.JSONFormat());
        
    }
    // task C.R.U.D
    addTask(name, info, date, priority, projID){
        const newTask = new Task(name, info, date, priority, projID);
        this.tasksList.push(newTask);
    }

    alocateTasks(taskId, projectId){
        console.log(`testing task management function`)
        const selectedProject = JSON.parse(this.data.load(projectId))
        const projectTask = selectedProject.tasks;
        console.log(this.tasksList[taskId]);
        projectTask.push(this.tasksList[taskId]);
        this.data.save(projectId,JSON.stringify(selectedProject));



        /*selectedProject.forEach((project)=>{
            const projectObj = JSON.parse(project);
            
            const currnetTasklist = projectObj.tasks;

            if(projectObj.ID === projectId){
                console.log(`found project: ${projectObj.name}`);
                this.tasksList.forEach((task)=>{
                    const taskObj = JSON.parse(task);
                    if(taskObj.ID === taskId){
                        console.log(`assigning task: ${taskObj.name} to ${projectObj.name}`)
                        currnetTasklist.push(taskObj);
                        this.#projects[projectObj.ID] = JSON.stringify(projectObj);
                        console.log(`current project: \n${this.#projects[projectObj.ID]}`)
                    
                    }
                })
            } 
        })*/

    }
    

    /*display items  */
    showProjects(){
        console.log(`current projects:`);
        console.log(this.#projects);
    }
    showTasks(){
        console.log(`current Tasks:`);
        console.log(this.tasksList)
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

