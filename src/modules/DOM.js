/*
 dom elements to make:
 => sidebar
 => top bar
 => project display container
 => task card elements
 */

import { topWhite,mainWhite, black ,green, urgentRed, moderateYellow } from "./colors"; // topwhite, mainwhite, balck


// main page initialization
const init = function(){
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
    body.appendChild(topBar());
    body.appendChild(sideBar());
    body.appendChild(displayContainer());
    return body;
};
// --STATIC ELEMENTS--

// topbar static element
const topBar = function(){
    
    const top = document.createElement("div");
    top.style.backgroundColor = topWhite();
    top.style.boxShadow = "inset 0px -18px 27px -35px rgba(29, 29, 31, 1)"
    top.style.display = "grid";
    top.style.gridTemplate = "1fr/ 47fr 1fr 1fr 1fr";

    const topLogo = document.createElement("div");
    topLogo.innerHTML ='<i class="fa-solid fa-mug-hot fa-fade"></i> Simply todo';
    topLogo.style.color = black();
    topLogo.style.fontSize= '38px';
    topLogo.style.alignSelf = "center";
    topLogo.style.marginLeft = "2vw";
    topLogo.style.gridArea = "logo";

    const urgent = document.createElement("div");
    urgent.style.background = urgentRed();
    urgent.style.gridArea ="urgent";

    const upComing = document.createElement("div");
    upComing.style.background = moderateYellow();
    upComing.style.gridArea ="upcoming";

    const free = document.createElement("div");
    free.style.background = green();
    free.style.gridArea ="free";

    top.appendChild(topLogo);
    top.appendChild(urgent);
    top.appendChild(upComing);
    top.appendChild(free);
    top.style.gridTemplateAreas = `"logo urgent upcoming free"`
    top.style.gridArea = "top";
    return top;
};
//sidebar static element
const sideBar = function(){
    const side = document.createElement("div");
    side.style.backgroundColor = black(); 
    side.style.boxShadow = "inset -1px 30px 33px -9px rgba(0, 0, 0, 1)"
    side.style.gridArea = "side";
    sidebarRoot = document.createElement("div");
    side.appendChild(sidebarRoot);
    return side;
};
//main display static element
const displayContainer = function(){
    const display = document.createElement("div");
    display.style.backgroundColor = mainWhite();
    display.style.boxShadow = "inset 22px 28px 34px -9px rgba(255, 255, 255, 1)"
    display.style.gridArea = "main";
    mainDisplayRoot = document.createElement("div");
    display.appendChild(mainDisplayRoot);

    return display;
};

//--dynamic elements
let sidebarRoot = null;
let mainDisplayRoot = null; 
// --DYNAMIC RENDERING --

const renderTop = function(){
};
const projectDialog = function(name){
// add project dialog modal
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
    btn.addEventListener("mouseover", ()=>{
        btn.style.padding = "10px";
        btn.style.color = black()
        btn.style.backgroundColor = topWhite();
    })

   
    dialog.appendChild(projectName); c
    dialog.appendChild(btn)

    return dialog
}
const renderSide = function(projects, btnFunction){
    sidebarRoot.innerHTML = "";
    sidebarRoot.style.height = "100%";
    sidebarRoot.style.display = "grid";
    sidebarRoot.style.gridTemplate= "1fr 20fr 1fr / 1fr";
    sidebarRoot.style.gridTemplateAreas = `
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
    projectList.style.gridArea = "projects";
    projectList.style.overflowY = "auto";           
    projectList.style.maxHeight = "100%";           
    projectList.style.display = "flex";             
    projectList.style.flexDirection = "column";     
    projectList.style.gap = "5px";                  
    projectList.style.padding = "5px";              
    projectList.style.boxSizing = "border-box";
    projects.forEach(project => {
        const btn = document.createElement("div");
        btn.style.gridArea = "projects"
        btn.style.fontSize = "18px";
        btn.style.color = mainWhite();
        btn.style.padding = "10px 10px"
        btn.style.justifySelf ="center"
        btn.style.alignSelf="center"

        if(project.name !== "urgent" &&project.name !== "upcoming"&&project.name !== "non urgent" ){

            btn.textContent = project.name;
            btn.addEventListener("click", ()=>{
            console.log(`click event for project ${project.name} at id ${project.id}`)
            })
            projectList.appendChild(btn);
        }
        btn.addEventListener("mouseover", ()=>{
            btn.style.fontSize = "20px"          
        })
        btn.addEventListener("mouseout", ()=>{
            btn.style.fontSize = "18px";
        })
    });
    //dialog window
    const dialogWindow = projectDialog()
    // add new project
    const addProject = document.createElement("div")
    addProject.innerHTML=`<i class="fa-solid fa-plus"></i>`;
    addProject.style.color = mainWhite();
    addProject.style.justifySelf ="center";
    addProject.style.alignSelf = "center";
    addProject.style.alignContent= "center";
    addProject.style.padding= "5px"
    addProject.style.gridArea = "addNew";
    addProject.addEventListener("click",()=>{
        //code goes here
        dialogWindow.showModal()
        
    })
    addProject.addEventListener("mouseover", ()=>{
        addProject.style.fontSize = "20px"
        addProject.style.borderRadius= "10px";
        addProject.style.backgroundColor = "#686868ff"
    })
    addProject.addEventListener("mouseout", ()=>{
        addProject.style.fontSize = "18px";
        addProject.style.backgroundColor = black();
    })
    document.body.appendChild(dialogWindow);
    sidebarRoot.appendChild(addProject);
    sidebarRoot.appendChild(projectList);
    sidebarRoot.appendChild(title);
    
    return sidebarRoot;

};

const renderDisplay= function(){};
const renderTasks = function(){};

export{
    init,
    renderSide,

}