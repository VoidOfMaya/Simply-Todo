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
        btn.style.color = mainWhite();
        btn.style.padding = "10px 10px"
        btn.style.justifySelf ="center"
        if(project.id !== 0 &&project.id !== 1 &&project.id !== 2){
            btn.textContent = project.name;
        }
        btn.addEventListener("click", ()=>{
            console.log(`click event for project ${project.name} at id ${project.id}`)
        })
        projectList.appendChild(btn);
    });
    // add new project
    const addProject = document.createElement("div")
    addProject.innerHTML=`<i class="fa-solid fa-plus"></i>`;
    addProject.style.color = mainWhite();
    addProject.style.justifySelf ="center";
    addProject.style.alignSelf = "center";
    addProject.style.gridArea = "addNew";
    addProject.addEventListener("click",()=>{
        //code goes here
    })

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