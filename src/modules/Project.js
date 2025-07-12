
class Project{
    static #id = 0;
    Id;
    taskList = [];
    constructor(projectName){
        this.projectName = projectName
        this.Id = Project.#generateId();
    }

    static #generateId(){
        return Project.#id++;
    }
    toJSON(){
        return{
            ID : this.Id,
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

