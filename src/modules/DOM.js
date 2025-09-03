/*
 dom elements to make:
 => sidebar
 => top bar
 => project display container
 => task card elements
 */

 import { colorScheme } from "./colors"; // topwhite, mainwhite, balck

 const color = new colorScheme();
 const body = document.querySelector("body");
 

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
    top.style.backgroundColor = color.topWhite;
    top.style.boxShadow = "inset 0px -18px 27px -35px rgba(29, 29, 31, 1)"
    top.style.gridArea = "top";
    return top
}
const sideBar = function(){
    const side = document.createElement("div");
    side.style.backgroundColor = color.black;
    side.style.gridArea = "side";
    return side
}
const displayContainer = function(){
    const display = document.createElement("div");
    display.style.backgroundColor = color.mainWhite;
    display.style.gridArea = "main";
    return display
}
export{
    body,
    topBar,
    sideBar,
    displayContainer
}