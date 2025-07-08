
import { ProjectManager } from "./modules/ProjectManager";

console.log(`project is live`);

const projectHandler = new ProjectManager();

/*demo projects */
projectHandler.addProject(`urgent`);
projectHandler.addProject('upcoming');
projectHandler.addProject(`non urgent`);


