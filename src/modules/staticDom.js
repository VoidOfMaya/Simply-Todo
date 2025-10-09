/*  static element creation 
 => sidebar
 => top bar
 => project display container
 => task card elements
 */

import { topWhite,mainWhite, black ,green, urgentRed, moderateYellow, gray, textGray } from "./colors"; // topwhite, mainwhite, balck

// element root
let sideRoot = null;
let mainRoot=null;

// main page initialization
const createHeader= function(){
    //global head element 
    const head = document.createElement("div");
    head.style.backgroundColor = topWhite();
    head.style.boxShadow = "inset 0px -18px 27px -35px rgba(29, 29, 31, 1)"
    head.style.display = "grid";
    head.style.gridTemplate = "1fr/ 47fr 1fr 1fr 1fr";
    head.style.gridTemplateAreas = `"logo urgent upcoming free"`
    head.style.gridArea = "top";

    // head logo
    const headLogo = document.createElement("div");
    headLogo.innerHTML ='<i class="fa-solid fa-mug-hot fa-fade"></i> Simply todo';
    headLogo.style.color = black();
    headLogo.style.fontSize= '38px';
    headLogo.style.alignSelf = "center";
    headLogo.style.marginLeft = "2vw";
    headLogo.style.gridArea = "logo";
    // head urgency level sorting "incomplete "
    const urgent = document.createElement("div");
    urgent.style.background = urgentRed();
    urgent.style.gridArea ="urgent";

    const upComing = document.createElement("div");
    upComing.style.background = moderateYellow();
    upComing.style.gridArea ="upcoming";

    const free = document.createElement("div");
    free.style.background = green();
    free.style.gridArea ="free";

    //element attachement to the global head element
    head.appendChild(headLogo);
    head.appendChild(urgent);
    head.appendChild(upComing);
    head.appendChild(free);

    return head;
}
const createSide = function(){
    const side = document.createElement("div");
    sideRoot = document.createElement("div")
    
    side.id = "sidebar";
    side.style.backgroundColor = black(); 
    side.style.boxShadow = "inset -1px 30px 33px -9px rgba(0, 0, 0, 1)"
    side.style.gridArea = "side";
    side.style.height = "100%";
    side.style.display = "grid";
    side.style.gridTemplate= "1fr 20fr 1fr / 1fr";
    side.style.gridTemplateAreas = `
    "title"
    "projects"
    "addNew"
    `
  //sidebar title
    const title = document.createElement("div");
    title.innerHTML = '<i class="fa-solid fa-diagram-project"></i> Projects';
    title.style.gridArea = "title";
    title.style.color = mainWhite();
    title.style.justifySelf = "center";
    title.style.alignSelf = "center";
   
    //sidebar projects hub
    const projectList = document.createElement("div")
    projectList.id= "project-list"
    projectList.style.gridArea = "projects";
    projectList.style.overflowY = "auto";           
    projectList.style.maxHeight = "100%";           
    projectList.style.display = "flex";             
    projectList.style.flexDirection = "column";     
    projectList.style.gap = "5px";                  
    projectList.style.padding = " px 5px 5px 5px";              
    projectList.style.boxSizing = "border-box";

    // add new project
    const addProject = document.createElement("div")
    addProject.id = "add-project-btn"
    addProject.innerHTML=`<i class="fa-solid fa-plus"></i>`;
    addProject.style.color = mainWhite();
    addProject.style.justifySelf ="center";
    addProject.style.alignSelf = "center";
    addProject.style.alignContent= "center";
    addProject.style.padding= "5px"
    addProject.style.gridArea = "addNew";

    //append children
    side.appendChild(title);
    side.appendChild(projectList);
    side.appendChild(addProject);
    side.appendChild(sideRoot);
    return {side, projectList, addProject};
}
const createDisplay = function(){
    const display = document.createElement("div");
    const mainContainer = document.createElement("div");
    const displayTitle = document.createElement("div");
    const tasksDisplay = document.createElement("div");
    const addTaskBtn = document.createElement("div"); 

    display.id = "Display";
    display.style.backgroundColor = mainWhite();
    display.style.boxShadow = "inset 22px 28px 34px -9px rgba(255, 255, 255, 1)";
    display.style.gridArea = "main";    
    
    mainContainer.id = "container";
    mainContainer.style.width = "100%";
    mainContainer.style.height = "100%";
    mainContainer.style.display = "grid";
    mainContainer.style.gridTemplateRows = "1fr 9fr 1fr "; 
    mainContainer.style.gridTemplateAreas = `"project-title"
                                             "task-display"
                                             "task-btn"` ; 
   
    displayTitle.style.color = black();
    displayTitle.style.fontSize = "38px";
    displayTitle.style.gridArea = "project-title" ;
    displayTitle.style.justifySelf = "center";
    displayTitle.style.alignSelf = "center";

    tasksDisplay.style.gridArea= "task-display";
    tasksDisplay.style.overflowY = "auto";           
    tasksDisplay.style.maxHeight = "100%";           
    tasksDisplay.style.display = "flex";             
    tasksDisplay.style.flexDirection = "column";     
    tasksDisplay.style.gap = "5px";                  
    tasksDisplay.style.padding = " px 5px 5px 5px";              
    tasksDisplay.style.boxSizing = "border-box";
    tasksDisplay.id = "task-display"

    addTaskBtn.style.gridArea ="task-btn";
    addTaskBtn.innerHTML= `<i class="fa-solid fa-plus"></i>`;
    addTaskBtn.style.justifySelf = "center";
    addTaskBtn.style.alignSelf = "center";
    addTaskBtn.style.color = topWhite();
    addTaskBtn.style.padding = "10px";
    addTaskBtn.style.fontSize = "20px";
    addTaskBtn.style.borderRadius = "10px"

    mainRoot = document.createElement("div");

    mainContainer.appendChild(displayTitle);
    mainContainer.appendChild(tasksDisplay); 
    mainContainer.appendChild(addTaskBtn);   
    display.appendChild(mainContainer);
    display.appendChild(mainRoot);

    return {display, mainContainer, displayTitle , tasksDisplay, addTaskBtn};
}
const deleteProjectDialog = function(deleteFunction, id){

    const deleteDialog = document.createElement("dialog");
    const alert = document.createElement("div");
    const cancelDelete = document.createElement("div");
    const excuteDelete = document.createElement("div")

    deleteDialog.style.padding = "0px";
    deleteDialog.style.paddingTop ="5px";
    deleteDialog.style.width = "25vw";
    deleteDialog.style.border = "none";
    deleteDialog.style.borderRadius = "40px";
    deleteDialog.style.backgroundColor = mainWhite()
    deleteDialog.style.display = "grid";
    deleteDialog.style.gap = "5px";
    deleteDialog.style.gridTemplate = "1fr 1fr/1fr 1fr";
    deleteDialog.style.alignItems = "center";
    deleteDialog.style.justifyContent = "center";
    deleteDialog.style.gridTemplateAreas = `"message message"
                                            "cancel delete"`

    alert.innerText= `placeholder text`;
    alert.style.padding = "0px 5px";
    alert.style.textAlign = "center";
    alert.style.gridArea ="message";

    cancelDelete.innerHTML = "<div>Cancel</div>";
    cancelDelete.style.justifyItems = "center";
    cancelDelete.style.padding = "5px";
    cancelDelete.style.color = mainWhite();
    cancelDelete.style.background = topWhite();
    cancelDelete.style.borderBottomLeftRadius = "40px";
    cancelDelete.style.gridArea = "cancel";

    excuteDelete.innerHTML = "<div>delete</div>";
    excuteDelete.style.justifyItems = "center";
    excuteDelete.style.padding = "5px";
    excuteDelete.style.color = mainWhite();
    excuteDelete.style.background = topWhite();
    excuteDelete.style.borderBottomRightRadius = "40px";
    excuteDelete.style.gridArea = "delete";


    deleteDialog.appendChild(alert);
    deleteDialog.appendChild(cancelDelete);
    deleteDialog.appendChild(excuteDelete);


    return {deleteDialog, deletBtn : excuteDelete, cancelBtn : cancelDelete, alert}


}
// task input format: title, info, priority, date, projectId`)
const createTaskCard = function (){
    const card = document.createElement('div');
    const taskName = document.createElement('div');
    const taskInfo = document.createElement('div');
    const taskPriority = document.createElement('div');
    const taskDate = document.createElement('div');
    const taskOpen = document.createElement('div');
    const taskEdit = document.createElement('div');

    taskPriority.id = "priority";
    taskName.id = "name";
    taskDate.id = "date";
    taskInfo.id = "info";
    taskOpen.id = "open";
    taskEdit.id = "edit";

    card.style.gridArea = "task-Card";
    card.style.margin = "0px 50px";
    card.style.background = topWhite();
    card.style.display= "grid";
    card.style.gridTemplateColumns = "10px 7fr 2fr 10px ";
    card.style.boxShadow = `inset 0px -20px 26px -20px rgba(187, 187, 187, 1)`
    card.style.borderRadius = "8px 8px 8px 8px"
    
    

    taskName.style.padding = "10px";
    taskName.style.fontSize = "26px"
    
    taskPriority.style.background = gray();
    taskPriority.style.color = mainWhite();
    taskPriority.style.fontSize = "20px";
    taskPriority.style.alignContent = 'center';
    taskPriority.style.textAlign = 'center';
    taskPriority.style.borderRadius = "5px 0px 0px 5px"
    
    taskDate.style.alignSelf = 'center';

    taskOpen.style.background = gray();
    taskOpen.style.color = mainWhite();
    taskOpen.style.fontSize = "20px";
    taskOpen.style.alignContent = 'center';
    taskOpen.style.textAlign = 'center';
    taskOpen.style.borderRadius = "0px 5px 5px 0px";

    taskEdit.style.background = topWhite();
    taskEdit.style.color = mainWhite();
    taskEdit.style.fontSize = "20px"
    taskEdit.style.margin = "20px 0px 20px 0px";
    taskEdit.style.borderRadius ="20px 0px 0px 20px";

    taskPriority.style.gridArea = "priority";
    taskName.style.gridArea = "name";
    taskDate.style.gridArea = "date";
    taskInfo.style.gridArea = "info";
    taskOpen.style.gridArea = "open";

    card.style.gridTemplateAreas = `"priority name date open"`;

    card.appendChild(taskName);
    card.appendChild(taskInfo);
    card.appendChild(taskPriority);
    card.appendChild(taskDate)
    card.appendChild(taskOpen);
    card.appendChild(taskEdit);
    
 return {taskCard : card, taskInfo, taskName, taskPriority, taskDate, taskOpen, taskEdit}
}

const createProjectDialog = function(){
    const dialog = document.createElement("dialog");
    dialog.style.width = "25vw";
    dialog.style.border = "none";
    dialog.style.borderRadius = "40px";
    dialog.style.backgroundColor = mainWhite()
    dialog.style.display = "grid";
    dialog.style.gridTemplate = "1fr /2fr 1fr";
    dialog.style.alignItems = "center";
    dialog.style.justifyContent = "center";
    
    
    const projectName = document.createElement("input");
    projectName.type = "text";
    projectName.placeholder= "Project name :";
    projectName.style.width = "90%";
    projectName.style.justifySelf= "center";
    projectName.style.border = "none";
    projectName.style.outline = "none";
    projectName.style.padding = "10px";
    projectName.style.borderRadius ="25px 0px 0px 25px";
    projectName.style.marginLeft = "20%";
    
    const btn = document.createElement("div");
    btn.innerText="cancel";
    btn.style.backgroundColor = topWhite()
    btn.style.padding= "10px"
    btn.style.borderRadius = "0px 25px 25px 0px"
    btn.style.justifySelf = "center";
    btn.addEventListener("mouseover", ()=>{
        btn.style.padding = "11px";
        btn.style.color = mainWhite()
        btn.style.backgroundColor = urgentRed;
    })
    btn.addEventListener("mouseout", ()=>{
        btn.style.padding = "10px";
        btn.style.color = black()
        btn.style.backgroundColor = topWhite();
    })
    
    dialog.appendChild(projectName);
    dialog.appendChild(btn)
    

    return {dialog, projectName, btn};
}
const createTaskDialog = function(){
    // required inputs name, info, date, priority, projID
    const taskDialog= document.createElement('dialog');
   
    const title = document.createElement('div');
    const name = document.createElement('input');
    const info = document.createElement('input');
    const date = document.createElement('input');
    const priority = document.createElement('div');
    const createBtn = document.createElement('div');
    const cancelBtn = document.createElement('div');

    taskDialog.style.border = "none";
    taskDialog.style.borderRadius = "25px";
    taskDialog.style.width = "40vw";
    taskDialog.style.display = "grid";
    taskDialog.style.gridTemplateColumns = "1fr 1fr";
    taskDialog.style.gridTemplateRows = ""
    taskDialog.style.gridTemplateRows = "repeat(1fr * 6)";
    taskDialog.style.gap = "15px";
    taskDialog.style.background = topWhite();

    title.innerHTML =" create new task";
    title.style.fontsize = "26px";
    title.style.gridArea = "title";
    title.style.justifySelf = "center";

    name.type = "text";
    name.min = "0";
    name.max = "10"; 
    name.style.gridArea= "name-input";
    name.style.border= "none";
    name.style.border= "focus: none";
    name.style.padding= "5px";
    name.placeholder = "task name:"

    info.type = "text";
    info.min = "0";
    info.max = "50"; 
    info.style.gridArea = "info-input";
    info.placeholder = "basic task info:"
    
    date.type = "date";
    date.style.gridArea= "date-input";

    priority.style.gridArea = "priority-input";
    priority.style.display = "grid";
    priority.style.justifyContent = "center";
    priority.style.gridTemplateColumns= "1fr 1fr 1fr" ;
    priority.style.gridTemplateRows = "1fr 2fr";
    priority.style.gridTemplateAreas = `".  title ."
                                        "urgent moderate non-urgent"`;

    const priorityHead = document.createElement('div');
    priorityHead.innerHTML ="set priority level";
    priorityHead.style.gridArea = "title";


    const urgent = document.createElement("div");
    urgent.innerHTML = "urgent";
    urgent.style.textAlign = "center";
    urgent.style.alignContent= "center";
    urgent.style.gridArea = "urgent";
    urgent.style.background= urgentRed();

    const moderate = document.createElement("div");
    moderate.innerHTML = "moderate";
    moderate.style.textAlign = "center";
    moderate.style.alignContent= "center";
    moderate.style.gridArea = "moderate";
    moderate.style.background = moderateYellow();

    const nonUrgent = document.createElement("div");
    nonUrgent.innerHTML = "none urgent";
    nonUrgent.style.textAlign = "center";
    nonUrgent.style.alignContent= "center";
    nonUrgent.style.gridArea = "non-urgent";
    nonUrgent.style.background = green();

    priority.appendChild(priorityHead);
    priority.appendChild(urgent);
    priority.appendChild(moderate);
    priority.appendChild(nonUrgent);



    createBtn.style.gridArea= "create-btn";
    createBtn.innerHTML = "create";
    createBtn.style.background = mainWhite();
    createBtn.style.padding = "10px";
    createBtn.style.borderRadius = "0px 0px 20px 0px";
    createBtn.style.fontSize = "20px";
    createBtn.style.textAlign = "center";

    cancelBtn.style.gridArea = "cancel-btn";
    cancelBtn.innerHTML = "cancel";
    cancelBtn.style.background = mainWhite();
    cancelBtn.style.borderRadius = "0px 0px 0px 20px";
    cancelBtn.style.fontSize = "20px";
    cancelBtn.style.textAlign= "center";
    cancelBtn.style.alignContent = "center";

    taskDialog.style.gridTemplateAreas= `"title title"
                                         "name-input name-input"
                                         "date-input date-input"
                                         "info-input info-input"
                                         "priority-input priority-input"
                                         "cancel-btn create-btn"`
    
    taskDialog.appendChild(title);
    taskDialog.appendChild(name);
    taskDialog.appendChild(info);
    taskDialog.appendChild(date);
    taskDialog.appendChild(priority);
    taskDialog.appendChild(createBtn);
    taskDialog.appendChild(cancelBtn);
    


    return {taskDialog, name, info, date, createBtn, cancelBtn, priority, urgent, moderate, nonUrgent };
}
//spliting finctions to variables while calling the function once
const { deleteDialog, deletBtn, cancelBtn, alert} = deleteProjectDialog();
const { dialog, projectName, btn } = createProjectDialog();
const {side, projectList, addProject} = createSide();
const {display, mainContainer, displayTitle, tasksDisplay, addTaskBtn} = createDisplay()
const {taskCard, taskInfo, taskName, taskPriority, taskDate, taskOpen, taskEdit} = createTaskCard();
const {taskDialog, name, info, date, createBtn, cancelBtn: cancel_cTD, priority, urgent, moderate, nonUrgent} = createTaskDialog();
// _CPD is a pointer to the original function 
export const staticDom= {
     //header
    head : createHeader(),
    //main project display
    main : display, mainContainer, displayTitle, tasksDisplay, addTaskBtn,
    //sidebar
    side, sideRoot: projectList, addProjectBtn: addProject,
    //create project dialog
    dialog_CPD : dialog, input_CPD  : projectName, button_CPD : btn,
    //delete project dialog
    dialog_dPD : deleteDialog, delete_dBD : deletBtn, cancel_dBD : cancelBtn, alert_dBD  : alert, 
    //task card
    taskCard, taskInfo, taskName, taskPriority, taskDate , taskOpen, taskEdit,
    //task dialog
    taskDialog, name, info, date, createBtn, cancel_cTD, priority, urgent, moderate, nonUrgent,
}