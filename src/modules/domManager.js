import { topWhite,mainWhite, black ,green, urgentRed, moderateYellow } from "./colors"; // topwhite, mainwhite, balck
import { staticDom } from "./staticDom";

let dialogInstance =null;
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
    body.appendChild(staticDom.head);
    body.appendChild(staticDom.main);
    return body;   

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

const initSideBare = function(projects){
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
    renderSide(projects);
}
const renderSide = function(projects){
    const root = staticDom.sideRoot;
    root.innerHTML = "";

    projects.forEach((project) => {
        if (["urgent", "upcoming", "non urgent"].includes(project.name)) return;

        const btn = document.createElement("div");
        btn.textContent = project.name;
        btn.style.fontSize = "18px";
        btn.style.color = mainWhite();
        btn.style.padding = "10px";
        root.appendChild(btn);
        btn.addEventListener("click", () => {
            console.log(`Project clicked: ${project.name}`);
        });

        btn.addEventListener("mouseover", () => btn.style.fontSize = "20px");
        btn.addEventListener("mouseout", () => btn.style.fontSize = "18px");

        
    });
}

export{
    init,
    initDialogP,
    initSideBare,
    renderSide,
}