//import { Project } from "./modules/Project";
//import { Task } from "./modules/Todo.";

class ProjectManager{
    constructor(){
        this.Projects = [];
        this.tasks =[];
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