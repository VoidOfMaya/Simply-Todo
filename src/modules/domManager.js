import { topWhite,mainWhite, black ,green, urgentRed, gray, moderateYellow } from "./colors"; // topwhite, mainwhite, balck
import { staticDom } from "./staticDom";

let dialogInstance =null;
let homeProject = null;
let currentProjectToDelete = null;
let sideDialogListenerInit = false;
let taskDialogListenerInit = false;
let taskCardEventListener = false;

//initialization
const init = function(defaultProject, tasks, createTask){
    const {head, main, tasksDisplay} = staticDom
    const body = document.querySelector("body");
    body.style.fontFamily = "Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif";
    body.style.display = "grid";
    body.style.height= "100vh";
    body.style.margin= "0px";
    body.style.gridTemplate = "1fr 10fr / 2fr 10fr"
    body.style.gridTemplateAreas = `
    "top top"
    "side main"
    ` 
    console.log(`init  function : default project- ${defaultProject.name}`)
    populatetMain(defaultProject, tasks, createTask);
    body.appendChild(head);
    body.appendChild(main);
    return body;   

}
const initSideBare = function(projects, removeFunction, tasks, taskCreate, getProject){
    //append ti body
    document.body.appendChild(staticDom.side);  

    //singletone instance of project creat dialog
    dialogInstance = staticDom.dialog_CPD;
    //document.body.appendChild(dialogInstance);

    //init add project button
    staticDom.addProjectBtn.addEventListener("click",()=>{
        document.body.appendChild(dialogInstance);
        dialogInstance.showModal();
    });
        staticDom.addProjectBtn.addEventListener("mouseover", () => {
        staticDom.addProjectBtn.style.fontSize = "20px";
        staticDom.addProjectBtn.style.borderRadius = "10px";
        staticDom.addProjectBtn.style.backgroundColor = "#686868ff";
    });

    staticDom.addProjectBtn.addEventListener("mouseout", () => {
        staticDom.addProjectBtn.style.fontSize = "18px";
        staticDom.addProjectBtn.style.backgroundColor = black();
    });
    renderSide(projects, removeFunction, tasks, taskCreate, getProject);
}
//Dialog eventlistener inatance manager

const setupSidedialogListeners = function (removefunction, tasks, createTask){
    const { dialog_dPD, delete_dBD, cancel_dBD } = staticDom;
    if(sideDialogListenerInit) return
    // cancell event handling    
    cancel_dBD.addEventListener('click', ()=>{
    dialog_dPD.close();
    if(document.body.contains(dialog_dPD)){
        document.body.removeChild(dialog_dPD);
    }
    console.log("project deletion- cancelled")
    });
    cancel_dBD.addEventListener("mouseover", () => {
        cancel_dBD.style.background = green();
    });
    cancel_dBD.addEventListener("mouseout", () => {
        cancel_dBD.style.background = topWhite();
    });
    //delete event handelling
    delete_dBD.addEventListener("mouseover", () => {
        delete_dBD.style.background = urgentRed();
    });
    delete_dBD.addEventListener("mouseout", () => {
        delete_dBD.style.background = topWhite();
    });
    delete_dBD.addEventListener('click', ()=>{
        if(!currentProjectToDelete) return;
        const project = currentProjectToDelete;
        if(["urgent", "upcoming", "non urgent", "home"].includes(project.name) ){
            console.log("can not delet essential manditory projects")
            dialog_dPD.close();
            if (document.body.contains(dialog_dPD)) {
                document.body.removeChild(dialog_dPD);
            }
            return;
        }
        removefunction(project.id);
        dialog_dPD.close()
        if (document.body.contains(dialog_dPD)) {
            document.body.removeChild(dialog_dPD);
        }
        populatetMain(homeProject, tasks, createTask);
        console.log(`project "${project.name}" at id "${project.id}" should be deleted`)
        currentProjectToDelete = null;

    });
    sideDialogListenerInit = true;
}

const taskDialogEventHandler = function(project, createTask){
    const {addTaskBtn} = staticDom;
    if(taskDialogListenerInit) return;
    addTaskBtn.addEventListener('click', ()=>{
        console.log('task creation button triggered')
    })
    taskDialogListenerInit = true;
}

//display management takes: 1project , gettask function instance, create task function for triggering dialog
const populatetMain= function(project, tasks, createTask){
    const {head, main, displayTitle, tasksDisplay, addTaskBtn} = staticDom
    console.log(`populating ${project.name} initializing at id ${project.id}`);
    //for intialization
    console.log(tasks(project.id));
    taskDialogEventHandler(project, createTask);

    displayTitle.innerHTML = "";          
    displayTitle.innerText= project.name;
    populateTasks(project.id, tasks);

    addTaskBtn.addEventListener('mouseover',()=>{
        addTaskBtn.style.color = black();
        addTaskBtn.style.background = topWhite();
    });
    addTaskBtn.addEventListener('mouseout',()=>{
        addTaskBtn.style.color = topWhite();
        addTaskBtn.style.background = mainWhite();
    });
    //task display  
    console.log(`populate ${project.name} finished`);  
}
const populateTasks = function (projectId, tasks){
    const {taskCard, taskInfo, taskName, taskPriority, taskDate, taskEdit, tasksDisplay} = staticDom;
    tasksDisplay.innerHTML = ""
    let isExpanded = false;
    
    tasks(projectId).forEach(task=>{
        //cloning card from original
        const cardClone = taskCard.cloneNode(true)

        const cloneName = cardClone.querySelector("#name");
        const cloneInfo  = cardClone.querySelector("#info");
        const cloneDate  = cardClone.querySelector("#date");
        const clonePriority = cardClone.querySelector("#priority");
        const cloneEdit = cardClone.querySelector("#edit");

        cloneName.innerText = task.name;
        cloneInfo.innerText = task.info;
        cloneDate.innerText = task.dueDate;

        clonePriority.innerHTML = "";
        cloneEdit.innerHTML = "";
        
        //task cards animation
 
        if(task.priority === "urgent"){
            clonePriority.style.background = urgentRed();
        }
        if(task.priority === "upcoming"){
            clonePriority.style.background = moderateYellow();
        }
        if(task.priority === "none-urgent"){
            clonePriority.style.background = green();
        }

        clonePriority.addEventListener('mouseover',()=>{
            cardClone.style.gridTemplateColumns = "2fr 5fr 2fr 10px ";
            clonePriority.innerText = task.priority;
        })
        clonePriority.addEventListener('mouseout',()=>{
            cardClone.style.gridTemplateColumns ="10px 7fr 2fr 10px ";
            clonePriority.innerHTML = "";
        })
        cloneEdit.addEventListener('mouseover',()=>{
            cardClone.style.gridTemplateColumns = "10px 7fr 2fr 70px ";
            cloneEdit.innerHTML = "edit";
        })
        cloneEdit.addEventListener('mouseout',()=>{
            cardClone.style.gridTemplateColumns ="10px 7fr 2fr 10px ";
            cloneEdit.innerHTML = "";
        })

        //on click

        cloneEdit.addEventListener('click',()=>{
            if (!isExpanded){
                console.log(isExpanded);
                cardClone.style.gridTemplateColumns ="10px 7fr 2fr 10px ";
                cardClone.style.gridTemplateRows = "1fr 1fr";

                cardClone.style.gridTemplateAreas = `"priority name date edit"
                                                     "priority info info edit"`
                isExpanded = true;
            }else{
                cardClone.style.gridTemplateColumns = "10px 7fr 2fr 10px ";
                cardClone.style.gridTemplateRows = "1fr";
                cardClone.style.gridTemplateAreas = `"priority name date edit"`;
                isExpanded =false;
            }
        })

        tasksDisplay.style.padding = "0px 10px";
        tasksDisplay.style.gap = "15px";
        tasksDisplay.appendChild(cardClone);
        
    })

}
const initDialogP = function(btnFunction){
    //extracting out dialog relevant variables from staticDom
    const{dialog_CPD, input_CPD, button_CPD} = staticDom;

    button_CPD.addEventListener("click",()=>{
        const name = input_CPD.value.trim();
        if (name === ""){
            alert("please enter a project name");
            return            
        }
        btnFunction(name);
        dialog_CPD.close();
        document.body.removeChild(dialogInstance);        
        
    })

}  
const renderSide = function(projects, removefunction, tasks, createTask, getProjectById){
    const root = staticDom.sideRoot;
    const { dialog_dPD, delete_dBD, alert_dBD } = staticDom;
    root.innerHTML = "";

    setupSidedialogListeners(removefunction, tasks, createTask);
    homeProject = projects.find(p => p.name === "home");

    projects.forEach((project) => {

        const projectId = project.id;
        if (["urgent", "upcoming", "non urgent"].includes(project.name)) return;

        const btn = document.createElement("div");
        const name = document.createElement("div");
        const remove = document.createElement("div");

        btn.style.display = "grid";
        btn.style.gridTemplateColumns = "1fr 19fr";
        btn.style.gridTemplateAreas = `"remove name"`;

        name.textContent = project.name;
        name.style.gridArea ="name";
        name.style.alignContent ="center"
        name.style.paddingLeft = "5px"
 
        remove.textContent = '';
        remove.style.gridArea = "remove"
        remove.style.alignContent ="center"
        remove.style.textAlign = "center"
       
        btn.style.fontSize = "18px";
        btn.style.color = mainWhite();
        btn.style.height = "40px";
        btn.appendChild(remove);
        btn.appendChild(name);
        root.appendChild(btn);

        //general button event handeling
        
        name.addEventListener("click", ()=>{
            const freshProject = getProjectById(projectId)
            if(!freshProject){
                console.log(`youre tryinh to view project ${project.name}, at id: ${freshProject}`)
                alert("selected project no longer exists."); 
                
            }
            populatetMain(freshProject, tasks, createTask);

        });
            
        
        name.addEventListener("mouseover", () => {
            name.style.fontSize = "20px"
            remove.style.background = urgentRed();
            name.style.background = gray();
            
        });
        name.addEventListener("mouseout", () => {
            name.style.fontSize = "18px"
            remove.style.background = "none";
            name.style.background = black();
        });
        //delet event handeling
        remove.addEventListener("mouseover", ()=>{           
            remove.textContent = 'delete'; 
            remove.style.paddingRight = "15px";
            remove.style.paddingLeft = "15px";
            name.style.gridTemplateColumns = "4fr 6fr";
            remove.style.background = urgentRed();
            name.style.background = gray();
            
        })
        remove.addEventListener("mouseout", ()=>{
            
            remove.textContent = '';
            remove.style.paddingRight = "0px";
            remove.style.paddingLeft = "0px";
            name.style.gridTemplateColumns = "1fr 19fr";
            remove.style.background = black();
            name.style.background = black();
        })
        //delet action remove model
        remove.addEventListener("click", ()=>{

            currentProjectToDelete = project;
            document.body.appendChild(dialog_dPD);
            dialog_dPD.showModal();
            alert_dBD.innerHTML = `this action will delete your "${project.name}" Project !`
            
        })        
    });
}
export{
    init,
    initDialogP,
    initSideBare,
    renderSide,
}