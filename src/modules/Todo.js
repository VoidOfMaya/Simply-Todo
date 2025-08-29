//TODO object


class Task{
    static #id = 0;
    #taskId;
    constructor(title, info, dueDate,priority , projectId){
        this.title = title;
        this.info = info;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.#taskId = Task.#generateId();
        //console.log(`title: ${title}\ninfo: ${info}\ndue date: ${dueDate}\npriority: ${priority}\nproject linked: ${projectId}`)
    }
    static #generateId(){
        return Task.#id++;
    }
    toJSON(){
        return{
            id : this.#taskId,
            name: this.title,
            info:this.info,
            dueDate: this.dueDate,
            priority: this.priority,
            projectId: this.projectId

        };
    }
    JSONFormat(){
        return JSON.stringify(this.toJSON());
    }

}

export{
    Task,
}