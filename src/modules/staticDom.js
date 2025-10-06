/*  static element creation 
 => sidebar
 => top bar
 => project display container
 => task card elements
 */

import { topWhite,mainWhite, black ,green, urgentRed, moderateYellow } from "./colors"; // topwhite, mainwhite, balck

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
    projectList.style.padding = "5px";              
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
    const displayTitle = document.createElement("h1");
    const tasksDisplay = document.createElement("div")  

    mainContainer.id = "container"
    mainContainer.style.width = "100%"
    mainContainer.style.height = "100%"
    mainContainer.style.display = "grid";
    mainContainer.style.gridTemplateRows = "1fr 9fr";

    display.id = "Display"
    display.style.backgroundColor = mainWhite();
    display.style.boxShadow = "inset 22px 28px 34px -9px rgba(255, 255, 255, 1)"
    display.style.gridArea = "main";

    mainRoot = document.createElement("div");

    mainContainer.appendChild(displayTitle);
    mainContainer.appendChild(tasksDisplay);    
    display.appendChild(mainContainer);
    display.appendChild(mainRoot);

    return {display, mainContainer, displayTitle , tasksDisplay};
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
    alert.style.justifySelf = "center";
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
    projectName.placeholder= "Project name goes here";
    projectName.style.width = "90%";
    projectName.style.justifySelf= "center";
    projectName.style.border = "none";
    projectName.style.outline = "none";
    projectName.style.padding = "10px";
    projectName.style.borderRadius ="25px 0px 0px 25px";
    projectName.style.marginLeft = "20%";
    
    const btn = document.createElement("div");
    btn.innerHTML= "Create"
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
//spliting finctions to variables while calling the function once
const { deleteDialog, deletBtn, cancelBtn, alert} = deleteProjectDialog();
const { dialog, projectName, btn } = createProjectDialog();
const {side, projectList, addProject} = createSide();
const {display, mainContainer, displayTitle, tasksDisplay} = createDisplay()
// _CPD is a pointer to the original function 
export const staticDom= {
        head : createHeader(),
        main : display,
        mainContainer,
        displayTitle,
        tasksDisplay,
        side,
        sideRoot: projectList,
        addProjectBtn: addProject,
        dialog_CPD : dialog,
        input_CPD  : projectName,
        button_CPD : btn,
        dialog_dPD : deleteDialog,
        delete_dBD : deletBtn,
        cancel_dBD : cancelBtn,
        alert_dBD  : alert, 

    }