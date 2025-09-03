/*
 dom elements to make:
 => sidebar
 => top bar
 => project display container
 => task card elements
 */

 import { topWhite,mainWhite, black ,green, urgentRed, moderateYellow } from "./colors"; // topwhite, mainwhite, balck

const body = document.querySelector("body");

const topLogo = document.createElement("div");
topLogo.innerHTML ="logo placeholder";
topLogo.style.alignSelf = "center";
topLogo.style.marginLeft = "2vw";
topLogo.style.gridArea = "logo";

const urgent = document.createElement("div");
urgent.style.background = urgentRed();
urgent.style.gridArea ="urgent";
console.log(urgentRed());

const upComing = document.createElement("div");
upComing.style.background = moderateYellow();
upComing.style.gridArea ="upcoming";

const free = document.createElement("div");
free.style.background = green();
free.style.gridArea ="free";

 

 const onInit = (function(){
    body.style.display = "grid";
    body.style.height= "100vh";
    body.style.margin= "0px";
    body.style.gridTemplate = "1fr 10fr / 2fr 10fr"
    body.style.gridTemplateAreas = `
    "top top"
    "side main"
    `
})();
const topBar = function(){
    
    const top = document.createElement("div");
    top.style.backgroundColor = topWhite();
    top.style.boxShadow = "inset 0px -18px 27px -35px rgba(29, 29, 31, 1)"
    top.style.display = "grid";
    top.style.gridTemplate = "1fr/ 47fr 1fr 1fr 1fr";
   
    top.appendChild(topLogo);
    top.appendChild(urgent);
    top.appendChild(upComing);
    top.appendChild(free);
    top.style.gridTemplateAreas = `"logo urgent upcoming free"`
    //layout placement
    top.style.gridArea = "top";
    return top
}
const sideBar = function(){
    const side = document.createElement("div");
    side.style.backgroundColor = black(); 
    side.style.boxShadow = "inset -1px 30px 33px -9px rgba(0, 0, 0, 1)"
    side.style.gridArea = "side";
    return side
}
const displayContainer = function(){
    const display = document.createElement("div");
    display.style.backgroundColor = mainWhite();
    display.style.boxShadow = "inset 22px 28px 34px -9px rgba(255, 255, 255, 1)"
    display.style.gridArea = "main";
    return display
}



export{
    body,
    topBar,
    sideBar,
    displayContainer
}