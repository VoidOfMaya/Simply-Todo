//TODO object


class Task{
    static #id = 0;
    constructor(title, info, dueDate,priority , projectId){
        this.title = title;
        this.info = info;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        Task.#generateId();
        console.log(`title: ${title}\ninfo: ${info}\ndue date: ${dueDate}\npriority: ${priority}\nproject linked: ${projectId}`)
    }
    static #generateId(){
        return Taskstat.#id++;
    }
}

export{
    Task,
}