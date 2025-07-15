
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
    
    //#projects = [];
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
        console.log(`saved project array: ${projArray}`);
        
        
    }
    //read
    readProject(id){
        //const projArray = JSON.parse(this.data.load("proj"))

        //console.log(projArray)
    }
    /*readProject(id){
    
        console.log(localStorage.key(id))
        
        const project = JSON.parse(this.data.load(id));
        const printTasks =()=> {
            project.tasks.forEach(task => {
                console.log(`task id: ${task.ID}\ntask name: ${task.name}\ntask due date: ${task.dueDate}\ntask priority: ${task.priority}\n`);
                console.log(`task info: ${task.info}\n`);
                
            });
            
        }
        console.log(`Project id: ${project.ID}\nProject name: ${project.name}\n`);
        printTasks();
    }*/

    //update

    //delete


    // task C.R.U.D
    //create
    addTask(name, info, date, priority, projID){
        const newTask = new Task(name, info, date, priority, projID);
        this.tasksList.push(newTask);
    }

    alocateTasks(taskId, projectId){
        //console.log(`testing task management function`)
        const selectedProject = JSON.parse(this.data.load(projectId))
        const projectTask = selectedProject.tasks;
        //console.log(selectedProject);
        projectTask.push(this.tasksList[taskId]);
        this.data.save(projectId,JSON.stringify(selectedProject));
    }
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


