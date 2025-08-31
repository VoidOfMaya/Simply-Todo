
import { Task } from "./Todo";
import { Project } from "./Project";
import { Storage } from "./Storage";

class TaskManager{
    
    data = new Storage();
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

}
export{
    TaskManager,
}