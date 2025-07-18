
import { Task } from "./Todo";
import { Project } from "./Project";
import { Storage } from "./Storage";

/* what this does:
-single resposibility: sort tasks to their respective projcects
-gets projects 
-inputs created projects to local storage
-gets tasks
-inputs created tasks into projects within local storage
*/

class ProjectManager{
    
    
    tasksList = [];
    data = new Storage();
    constructor(){
        
        
    }
    //project C.R.U.D
    //create
    addProject(projectName){
        const newProject = new Project(projectName);
        const projectData = newProject;
        let projArray =this.data.load("proj");
        if( !Array.isArray(projArray)){
            projArray = [];
        }
        projArray.push(projectData);
        this.data.save("proj", projArray)

    }


    //update

    //delete


    // task C.R.U.D
    //create
    addTask(name, info, date, priority, projID){
        const newTask = new Task(name, info, date, priority, projID);
        const taskData = newTask;
        let taskArray =this.data.load("tasks");
        if( !Array.isArray(taskArray)){
            taskArray = [];
        }
        taskArray.push(taskData);
        this.data.save("tasks", taskArray)
        
    }
    //read projects and tasks
    getProject(projectId){
        const projectList = this.data.load("proj");
        if(projectList[projectId] !== undefined){
            console.log(`project "${projectList[projectId].name}" found!`);
        }else{
            console.log('project not found, doesnt exist');
        }
    }


    /*alocateTasks(taskId, projectId){
        //console.log(`testing task management function`)
        const selectedProject = JSON.parse(this.data.load(projectId))
        const projectTask = selectedProject.tasks;
        //console.log(selectedProject);
        projectTask.push(this.tasksList[taskId]);
        this.data.save(projectId,JSON.stringify(selectedProject));
        console.log(`project`)
    }*/
    //read
    //update
    //delete
    

    /*display items from storage */
    showProjects(){
        console.log(`current projects in storage:`);
        for (let i = 0; i < localStorage.length; i++) {
            const results = JSON.parse(localStorage.getItem(i));
            console.log(results);
        }
        console.log(localStorage.getItem(1))
    }
    showTasks(){
        console.log(`current Tasks in memory:`);
        console.log(this.tasksList);
        console.log(`current Tasks in storage:`);
        for(let i = 0; i < localStorage.length; i++){
            const currentLoad = JSON.parse(localStorage.getItem(i));
            console.log(currentLoad.tasks)
        }
    }
}


export{
    ProjectManager,
}


