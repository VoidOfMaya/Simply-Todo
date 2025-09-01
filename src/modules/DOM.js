/*
 current DOM required functionalities:
    =>Render tasks for a given project.
    =>Render all projects in a sidebar/menu.
    =>Expand/collapse project lists (nice-to-have).
    =>Display overdue tasks in red / highlight today’s tasks.
 */
class renderElements{
    renderSidebar(project){
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