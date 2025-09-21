import { staticDom } from "./staticDom";

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
    body.appendChild(staticDom.side);
    body.appendChild(staticDom.main);
    return body;   
}
const initDialogP = function(btnFunction){
    //extracting out dialog relevant variables from staticDom
    const{projDialog, projDialogInput, projDialogBtn} = staticDom;

    projDialogBtn.addEventListener("click",()=>{
        const name = projDialogInput.value.trim();
        if (name === ""){
            alert("please enter a project name");
            return            
        }
        btnFunction(name);
        projDialog.close();
        //renderSide(projects, btnFunction);
    })
    

}

export{
    init,
    initDialogP
}