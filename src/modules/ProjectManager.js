
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
    deletProject(id){
        const projectList = this.data.load("proj");
        if(!projectList.some(p => p.id === id)){
            console.log(`Delet function Error: project not found`)
            return;
        }
        const updatedlist = projectList.filter(project =>project.id !== id);
        this.data.save("proj", updatedlist);


    }
    getProject(id){
        const projectList = this.data.load("proj");
        if(projectList[id] === undefined){
            console.log('project not found, doesnt exist');

        }else{
            return projectList[id]
        }
    }
    updateProject(id, newName){
        const oldArray = this.data.load("proj");
        console.log(`runing the  update project method`);
        oldArray[id].name = newName;
        //console.log(oldArray[id]);
        this.data.save("proj", oldArray);
    }
    showProjects(){
        const projects = this.data.load("proj") || [];
        console.log("current projects : ", projects);
    }
    //task C.R.U.D
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
    getTasks(id){
        
        if(this.data.load("proj")[id] === undefined){
            console.log('your trying to get tasks from a project that doest exist')
            return
        }
        const taskList = this.data.load("tasks");
        const returnValue =  taskList.filter(task => String(task.projectId) === String(id));
        return returnValue;
    }
    // takes {uniqueId , {JSON objects}}
    updateTask(uniqueId, update){
        const oldArray = this.data.load("tasks");
        const keyUpdates = Object.keys(update);

        oldArray.forEach(task => {
            if(uniqueId === task.id){
                console.log(`id found, running update task`);
                
                keyUpdates.forEach(key=>{
                    if(key in task){
                        task[key] = update[key];
                    }
                });                            
            };
        });
        this.data.save("tasks", oldArray);
    }
    deletTask(id){
        const taskList = this.data.load("tasks");
        if(!taskList.some(t => t.id === id)){
            console.log(`Delet function Error: project not found`)
            return;
        }
        const updatedlist = taskList.filter(task =>task.id !== id);
        this.data.save("tasks", updatedlist);


    }
    showTasks(){
        const tasks = this.data.load("tasks") || [];
        console.log("current tasks:", tasks);
    }
 /* projectDuplicates(item){
        
        const projectArray = this.data.load("proj") || [];

    }*/
}


export{
    ProjectManager,
}


