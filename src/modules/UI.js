import projectList from "./projectList";


export default class UI {

    static initializeUI() {
        UI.intializeButtons();
    }

    static switchTab() {
        const buttons = document.querySelectorAll('.button-tab');
        const topRowTitle = document.querySelector('.top-row-title');
        let selectedIndex = 0;
        
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", (e) =>{
                buttons[i].classList.add("active");
                buttons[selectedIndex].classList.remove("active");
                selectedIndex = i;
                topRowTitle.textContent = e.target.textContent;
            });
        }
    }

    static intializeButtons() {
        UI.switchTab();
        const addProjectButton = document.querySelector("#add-project");
        addProjectButton.addEventListener("click", () => 
            UI.addProject())
    }

    static addProject() {
        const addProjectButton = document.querySelector("#add-project");
        const projectPopup = document.querySelector(".project-creation-popup");

        addProjectButton.classList.add("active");
        projectPopup.classList.add("active");

        const cancelButton = document.querySelector("#project-cancel-button");
        const addButton = document.querySelector("#project-add-button");

        addButton.addEventListener("click", () => {
            const input = document.querySelector("#project-name");
            UI.createProject(input.textContent);
        });
            
        cancelButton.addEventListener("click", (element) => {
            UI.closePopup(element,"project")
        });
            
    }

    static closePopup(element,popupType) {
        const addProjectButton = document.querySelector("#add-project");
        const projectPopup = document.querySelector(".project-creation-popup");
        if (popupType = "project") {        
            addProjectButton.classList.remove("active");
            projectPopup.classList.remove("active");
        } else if (popupType = "task") {
            //TODO: add todo task
        }
    }

    static createProject(input) {
        projectList.add(input)
        const div = document.createElement("div");
        const projectList = document.querySelector(".user-project-list");

        div.textContent = input;
        projectList.appendChild(div);
        
    }

}





