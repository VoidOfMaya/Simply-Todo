
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
        const returnedProject = projectList.find(p =>p.id === id)

        if(!returnedProject){
            console.log(`project at id: ${id}, doesnt exist`);

        }else{
            return returnedProject
        }
    }
    //update
    updateProject(id, newName){
        const oldArray = this.data.load("proj");
        console.log(`runing the  update project method`);
        const project = oldArray.find(proj => proj.id ===id)
        if(project){
            project.name = newName;
            this.data.save("proj", oldArray);            
        }else{
            console.error(`project with id ${id} not found`)
        }

    }
    //delet
    deletProject(id, updatetask){
        const projectList = this.data.load("proj");
        if(!projectList.some(p => p.id === id)){
            console.log(`Delet function Error: project not found`)
            return;
        }
        const updatedlist = projectList.filter(project =>project.id !== id);
        this.data.save("proj", updatedlist);

        updatetask();
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


