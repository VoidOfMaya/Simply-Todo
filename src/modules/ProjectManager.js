
import { Project } from "./Project";
import { Storage } from "./Storage";


class ProjectManager{
    // storage handler crud
    data = new Storage();
    constructor(){   
    }
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

    }
    //read
    getProject(id){
        const projectList = this.data.load("proj");
        if(projectList[id] === undefined){
            console.log(`project at id: ${id}, doesnt exist`);

        }else{
            return projectList[id]
        }
    }
    //update
    updateProject(id, newName){
        const oldArray = this.data.load("proj");
        console.log(`runing the  update project method`);
        oldArray[id].name = newName;
        //console.log(oldArray[id]);
        this.data.save("proj", oldArray);
    }
    //delet
    deletProject(id){
        const projectList = this.data.load("proj");
        if(!projectList.some(p => p.id === id)){
            console.log(`Delet function Error: project not found`)
            return;
        }
        const updatedlist = projectList.filter(project =>project.id !== id);
        this.data.save("proj", updatedlist);


    }    
    showProjects() {
        const projects = this.data.load("proj") || [];
        const result = [];
        projects.forEach(project => {
            result.push({ name: project.name, id: project.id });
        });
        return result;
    }
}


export{
    ProjectManager,
}


