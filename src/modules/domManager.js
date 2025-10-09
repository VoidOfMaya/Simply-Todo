import { topWhite,mainWhite, black ,green, urgentRed, gray, moderateYellow, textGray } from "./colors"; // topwhite, mainwhite, balck
import { staticDom } from "./staticDom";

let homeProject = null;
let currentProjectToDelete = null;
let sideDialogListenerInit = false;
let taskDialogListenerInit = false;
let taskCardEventListener = false;
let currentProject = null;
let currentClickListener = null;
let priorityLevel = "";
//initialization //has addtask
const init = function(defaultProject, tasks, addTask){
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
    populateMain(defaultProject, tasks, addTask);
    body.appendChild(head);
    body.appendChild(main);
    return body;   

}
const initSideBare = function(projects, removeFunction, tasks, getProject, addtask){
    //append ti body
 

    //singletone instance of project creat dialog
    const {side, dialog_CPD, input_CPD} = staticDom;
    document.body.appendChild(side); 
    //init add project button
    staticDom.addProjectBtn.addEventListener("click",()=>{
        input_CPD.value ="";
        document.body.appendChild(dialog_CPD);
        dialog_CPD.showModal();
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
    renderSide(projects, removeFunction, tasks, getProject, addtask);
}
const initDialogP = function(btnFunction){
    //extracting out dialog relevant variables from staticDom
    const{dialog_CPD, input_CPD, button_CPD} = staticDom;
    console.log(`button_cpd = ${button_CPD}`);
    input_CPD.addEventListener("input",()=>{
        if (input_CPD.value.trim() === ""){
            button_CPD.innerHTML = "Cancel";           
        }else{
            button_CPD.innerHTML = "Create";
        }
    })
    button_CPD.addEventListener("mouseover", ()=>{
        button_CPD.style.padding = "11px";
        button_CPD.style.color = mainWhite()
        if (input_CPD.value.trim() === ""){
            button_CPD.style.background = urgentRed();         
        }else{
        button_CPD.style.background = green();
        }

    })
    button_CPD.addEventListener("mouseout", ()=>{
        button_CPD.style.padding = "10px";
        button_CPD.style.color = black()
        button_CPD.style.background = topWhite();
    })
    button_CPD.addEventListener("click",()=>{
        const name = input_CPD.value.trim();
        if (name === ""){
            button_CPD.style.background = urgentRed();
            dialog_CPD.close();
            document.body.removeChild(dialog_CPD);        
            return            
        }else{
            button_CPD.style.background = green();
            btnFunction(name);
            dialog_CPD.close();
            document.body.removeChild(dialog_CPD);         
        }
    })
    input_CPD.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){
            button_CPD.click();
        }
    })

}
//Dialog eventlistener inatance manager // has add task
const setupSidedialogListeners = function (removefunction, tasks, addTask){
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
        populateMain(homeProject, tasks, addTask);
        console.log(`project "${project.name}" at id "${project.id}" should be deleted`)
        currentProjectToDelete = null;

    });
    sideDialogListenerInit = true;
}


//has add task
const projectDialogEventHandler = function(element, project, addTask, tasks){

    if(currentProject === project.id) return;
    if(currentClickListener){
        element.removeEventListener('click', currentClickListener);
    }
    
    currentClickListener = () => {
        taskCreation(addTask, tasks);
    };
    element.addEventListener('click', currentClickListener);
    
    currentProject = project.id;
    
    return element;
}
//has add task origin 


const prioritySelection = function (){
    const {priority, urgent, moderate, nonUrgent} = staticDom;

        urgent.addEventListener("click", ()=>{
            priorityLevel = "urgent";
            console.log(`priority set to: ${priorityLevel}`);
            return priorityLevel;
        });
        moderate.addEventListener("click", ()=>{
            priorityLevel ="upcoming";
            console.log(`priority set to: ${priorityLevel}`);
            return priorityLevel;
        });
        nonUrgent.addEventListener("click", ()=>{
            priorityLevel ="none-urgent";
            console.log(`priority set to: ${priorityLevel}`);
            return priorityLevel;
        });
          

    }
let createTaskDialogListenerInstance = false;
const taskCreation = function( addTask, tasks){
    const {taskDialog, name, info, date, createBtn, cancel_cTD} = staticDom;
    let projectId;
    //console.log(`loading tasks under project id: ${projectId}`);
    document.body.appendChild(taskDialog);
    taskDialog.showModal();


    if(!createTaskDialogListenerInstance){
        cancel_cTD.addEventListener("click", ()=>{
            projectId = currentProject;
            taskDialog.close();
            document.body.removeChild(taskDialog);
            console.log(`task creation dialog closed,for ${projectId}`);
            
        })
        createBtn.addEventListener('click',()=>{
            projectId = currentProject;
            addTask(name.value, info.value, date.value, priorityLevel, projectId);
            //console.log(`${name.value}, ${info.value}, ${date.value}, ${priorityLevel}, ${projectId}`)
            taskDialog.close();
            document.body.removeChild(taskDialog);           
        })
        taskDialog.addEventListener('close', ()=>{
            projectId = currentProject;
            console.log( tasks);
            populateTasks(projectId, tasks)
        })
        createTaskDialogListenerInstance = true;
        prioritySelection();

        
    }   
}
//display management takes: 1project , gettask function instance, create task function for triggering dialog
//has add task
const populateMain= function(project, tasks, addTask){
    const {displayTitle, addTaskBtn} = staticDom
    console.log("project in populateMain:", project);
    console.log(`populating ${project.name} initializing at id ${project.id}`);
    //for intialization
    console.log(tasks(project.id));
    projectDialogEventHandler( addTaskBtn, project, addTask, tasks);
    //taskbtnlistenerInstance = true;
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
    const {taskCard, tasksDisplay} = staticDom;
    tasksDisplay.innerHTML = ""
    
    tasks(projectId).forEach(task=>{

        //cloning card from original
        const cardClone = taskCard.cloneNode(true)
        let isExpanded = false;

        const cloneName = cardClone.querySelector("#name");
        const cloneInfo  = cardClone.querySelector("#info");
        const cloneDate  = cardClone.querySelector("#date");
        const clonePriority = cardClone.querySelector("#priority");
        const cloneOpen = cardClone.querySelector("#open");
        const cloneEdit = cardClone.querySelector('#edit');

        cloneName.innerText = task.name;
        cloneInfo.innerText ="";
        cloneDate.innerText = task.dueDate;

        clonePriority.innerHTML = "";
        cloneOpen.innerHTML = "";
        
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
        cloneOpen.addEventListener('mouseover',()=>{
            cardClone.style.gridTemplateColumns = "10px 5fr 2fr 2fr ";
            if(!isExpanded){
            cloneOpen.innerHTML = "open";
            }else{
                cloneOpen.innerHTML = "close";
            }
        })
        cloneOpen.addEventListener('mouseout',()=>{
            cardClone.style.gridTemplateColumns ="10px 7fr 2fr 10px ";
            cloneOpen.innerHTML = "";
        })
        cloneEdit.addEventListener('mouseover',()=>{
            cloneEdit.style.background = moderateYellow();
            cloneEdit.style.color = mainWhite();

        })
        cloneEdit.addEventListener('mouseout',()=>{
            cloneEdit.style.background = topWhite();
            cloneEdit.style.color = mainWhite();        
        })
        //on click
        cloneOpen.addEventListener('click',()=>{
            if (!isExpanded){
                console.log(isExpanded);
                cardClone.style.gridTemplateColumns ="10px 7fr 2fr 10px ";
                cardClone.style.gridTemplateRows = "1fr 2fr";
                
                cloneInfo.innerText = task.info;
                cloneInfo.style.padding = "0px 10px"

                cloneEdit.innerHTML = "edit";
                cloneEdit.style.color = mainWhite();
                cloneEdit.style.fontSize = "20px";
                cloneEdit.style.alignContent = 'center';
                cloneEdit.style.textAlign = 'center';
                cardClone.style.gridTemplateAreas = `"priority name date open"
                                                     "priority info edit open"`

                isExpanded = true;
            }else{
                cardClone.style.gridTemplateColumns = "10px 7fr 2fr 10px ";
                cardClone.style.gridTemplateRows = "1fr";
                cardClone.style.gridTemplateAreas = `"priority name date open"`;
                cloneInfo.innerText = "";
                cloneInfo.style.padding = '0px';
                cloneEdit.innerHTML ='';
                isExpanded =false;
            }
        })

        tasksDisplay.style.padding = "0px 10px";
        tasksDisplay.style.gap = "15px";
        tasksDisplay.appendChild(cardClone);
        
    })

}
 //has add task   
const renderSide = function(projects, removefunction, tasks, getProjectById, newTask){
    const root = staticDom.sideRoot;
    const { dialog_dPD, alert_dBD } = staticDom;
    root.innerHTML = "";

    setupSidedialogListeners(removefunction, tasks, newTask);
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
                return
                
            }
            populateMain(freshProject, tasks, newTask,);

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