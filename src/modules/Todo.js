//TODO object


class Task{
    static #id = 0;
    constructor(title, info, dueDate,priority){
        this.title = title
        this.info = info
        this.dueDate = dueDate
        this.priority = priority
    }
    static #generateId(){
        return Project.#id++;
    }
}

export{
    Task,
}