/*
 dom elements to make:
 => sidebar
 => top bar
 => project display container
 => task card elements
 */
class renderElements{
    renderSidebar(projects){
        const mainContainer = document.querySelector("body");
        const sidebar = document.createElement("div");

        sidebar.style.backgroundColor = "green";
        sidebar.innerHTML= 'side bar element';
        mainContainer.appendChild(sidebar);

    }
}
export{
    renderElements,
}