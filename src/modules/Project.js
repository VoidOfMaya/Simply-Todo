
class Project{
    static #id = 0;
    #projectId;
    taskList = [];
    constructor(projectName){
        this.projectName = projectName
        this.#projectId = Project.#generateId();
    }

    static #generateId(){
        return Project.#id++;
    }
    toJSON(){
        return{
            ID : this.#projectId,
            name: this.projectName,
            tasks: this.taskList
        };
    }
    JSONFormat(){
        return JSON.stringify(this.toJSON());
    }
}
export {
    Project,
}

