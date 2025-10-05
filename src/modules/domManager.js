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


const initSideBare = function(projects, removeFunction){
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
    renderSide(projects, removeFunction);
}
const renderSide = function(projects, removefunction){
    const root = staticDom.sideRoot;
    root.innerHTML = "";

    projects.forEach((project) => {
        if (["urgent", "upcoming", "non urgent"].includes(project.name)) return;

        
        const btn = document.createElement("div");
        const name = document.createElement("div");
        const remove = document.createElement("div")

        btn.style.display = "grid";
        btn.style.gridTemplateColumns = "1fr 19fr";
        btn.style.gridTemplateAreas = `"remove name"`

        name.textContent = project.name;
        name.style.gridArea ="name";

        
        remove.textContent = '';
        remove.style.gridArea = "remove"



        btn.style.fontSize = "18px";
        btn.style.color = mainWhite();
        btn.style.padding = "10px 0px";
        btn.appendChild(remove);
        btn.appendChild(name);
        root.appendChild(btn);

        //general button event handeling        
        btn.addEventListener("click", () => {
            console.log(`Project clicked: ${JSON.stringify(project)}`);

        });

        btn.addEventListener("mouseover", () => {
            btn.style.fontSize = "20px"
            remove.style.background = urgentRed();
        });
        btn.addEventListener("mouseout", () => {
            btn.style.fontSize = "18px"
            remove.style.background = "none";
            btn.style.gap = "5px"
        });
        //delet event handeling
        const {dialog_dPD, delete_dBD, cancel_dBD, alert_dBD} = staticDom;
        remove.addEventListener("mouseover", ()=>{
            
            remove.textContent = 'delete';
            
            btn.style.gridTemplateColumns = "4fr 6fr";

        })
        remove.addEventListener("mouseout", ()=>{
            
            remove.textContent = '';
            btn.style.gridTemplateColumns = "1fr 19fr";
        })
        remove.addEventListener("click", ()=>{
            document.body.appendChild(dialog_dPD);
            dialog_dPD.showModal();
            alert_dBD.innerHTML = `this action will delete your "${project.name}" Project !`
        })
        //internal delet dialog handelling
        const cancelClickHandler= function(){
            dialog_dPD.close()
            if(document.body.contains(dialog_dPD)){
                document.body.removeChild(dialog_dPD);
            }
            console.log("project deletion- cancelled")
        }
        // cancel btn
        cancel_dBD.addEventListener("mouseover", ()=>{
            cancel_dBD.style.background = green();
        })
        cancel_dBD.addEventListener("mouseout", ()=>{
            cancel_dBD.style.background = topWhite();
        })
        //handles event listener stacking
        cancel_dBD.removeEventListener('click', cancelClickHandler);
        cancel_dBD.addEventListener('click', cancelClickHandler);
        //delete btn
        delete_dBD.addEventListener("mouseover", ()=>{
            delete_dBD.style.background = urgentRed();
        })
        delete_dBD.addEventListener("mouseout", ()=>{
            delete_dBD.style.background = topWhite();
        })
        delete_dBD.addEventListener("click", ()=>{
            if(["urgent", "upcoming", "non urgent", "home"].includes(project.name) ){
                console.log("can not delet essential manditory projects")
                return
            }else{
            removefunction(project.id);
                dialog_dPD.close()
                document.body.removeChild(dialog_dPD);
                console.log(`project "${project.name}" at id "${project.id}" should be deleted`)
            }
        })


        
    });
}

export{
    init,
    initDialogP,
    initSideBare,
    renderSide,
}