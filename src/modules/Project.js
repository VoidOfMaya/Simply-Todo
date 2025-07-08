
class Project{
    static #id = 0;
    taskList = [];
    constructor(projectName){
        projectName = this.projectName
        Project.#generateId();
        console.log(`id number: ${Project.#id}`);
    }

    static #generateId(){
        return Project.#id++;
    }
}
export {
    Project,
}

