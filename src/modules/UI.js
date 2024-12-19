// import projectList from "./projectList";
import { format } from "date-fns";
import Storage from "./storage";
import Task from "./task";

export default class UI {

    static initializeUI() {
        UI.intializeButtons();
        UI.loadProjectList();
        UI.loadTasks(UI.getCurrentProject());
    }

    static initializeProjectButtons() {
        const buttons = document.querySelectorAll('.button-tab');
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", (e) =>{
                UI.openProject(e.target.textContent,e.target);
            });
        }
    }

    static openProject(projectName,projectButton) {
        const buttons = document.querySelectorAll('.button-tab');
        const topRowButton = document.querySelector(".top-row-title");
        buttons.forEach((button) => {
            button.classList.remove("active");
        })
        projectButton.classList.add("active")

        topRowButton.textContent = projectName;
        UI.loadTasks(UI.getCurrentProject());
    }

    static getCurrentProject() {
        const project = document.querySelector(".top-row-title");
        return project.textContent;
    }


    static intializeButtons() {
        const addProjectButton = document.querySelector("#add-project");
        const cancelButton = document.querySelector("#project-cancel-button");
        const addButton = document.querySelector("#project-add-button");
        const addTaskButton = document.querySelector("#add-task");
        const dialog = document.querySelector("dialog");
        const form = document.querySelector("form");
        const createTaskButton = document.querySelector("#create-task");
        const closeDialogButton = document.querySelector(".close-button");

        addProjectButton.addEventListener("click", () => 
            UI.showProjectPopUp())

        addButton.addEventListener("click", () => {
            const input = document.querySelector("#project-name");
            if(!input.checkValidity()){
                alert("Please enter a project name!");
            } else {
                UI.createProject(input.value);
                UI.closeProjectPopUp();
                input.value = "";
            }
        });
            
        cancelButton.addEventListener("click", () => {
            UI.closeProjectPopUp();
        });

        addTaskButton.addEventListener("click", () => {
            UI.toggleCreateButtonVisibility(true);
            dialog.showModal();
        });

        closeDialogButton.addEventListener("click", () => {
            UI.resetDialog();
        });

        createTaskButton.addEventListener("click", (e) => {
            const title = document.querySelector("#dialog-title");
            const description = document.querySelector("#dialog-description");
            const priority = document.querySelector('input[name="priority"]:checked');
            const date = document.querySelector("#dialog-due-date");
            if(!form.checkValidity()){
                form.reportValidity();
            } else {
                e.preventDefault();
                UI.createTask(title.value,description.value,false,priority.value,date.value,UI.getCurrentProject());
                UI.resetDialog();
            }
        });

        dialog.addEventListener("close", () => {
            UI.resetDialog();
        })

        
    }

    static showProjectPopUp() {
        const addProjectButton = document.querySelector("#add-project");
        const projectPopup = document.querySelector(".project-creation-popup");

        addProjectButton.classList.add("active");
        projectPopup.classList.add("active");
    }

    static closeProjectPopUp() {
        const addProjectButton = document.querySelector("#add-project");
        const projectPopup = document.querySelector(".project-creation-popup");     
        addProjectButton.classList.remove("active");
        projectPopup.classList.remove("active");
    }

    static loadProjectList(){
        const projArr = Storage.getProjectListArr();
        const projectList = document.querySelector(".user-project-list");
        projectList.innerHTML = "";
        for (const i in projArr) {
            let proj = document.createElement("button");
            proj.classList.add("button-tab");
            proj.textContent=(projArr[i]).replace(/"/g, '');
            proj.add
            projectList.appendChild(proj);
        }
        UI.initializeProjectButtons();
    }
    static createProject(input) {
        Storage.addProject(input);
        UI.loadProjectList();
    }
    static createTask(title,description,isChecked,priority,date,project){
        let formattedDate = "";
        if(date){
            date = new Date(date.replace(/-/g, '/')) //used to prevent date_fns bug, in which day gets set back 1 day due to hyphen
            formattedDate = format(date, 'MM/dd/yyyy');
        } 
        const task = new Task(title,description,isChecked,priority,formattedDate);
        Storage.addTask(task,project);
        UI.loadTasks(project);
        
    }

    static loadTasks(project) {
        let taskArr = Storage.getTaskArr(project);
        const listContainer = document.querySelector(".list-container");
        listContainer.innerHTML = ""

        for (const i in taskArr){
            const task = Object.assign(new Task, JSON.parse(taskArr[i]));
            const li = document.createElement("li");
            li.classList.add("item");
            li.innerHTML = `
                            <div class="priority ${task.getPriority()}"></div>
                            <input class = "checkbox" type="checkbox"></button>
                            <div class="due-date">${task.getDate()}</div>
                            <div class="item-title-and-description">
                                <div class="title">${task.getTitle()}</div>
                                <div class="description">${task.getDescription()}</div>
                            </div>`;
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            editButton.classList.add("edit-button");
            deleteButton.classList.add("delete-button");

            editButton.addEventListener("click", () => {
                //TODO: add edit button later, focus on storage rn
                UI.showEditPrompt(task);
            })
            

            deleteButton.addEventListener("click", () => {
                UI.deleteTask(task);
            })

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            listContainer.appendChild(li);  
        }
    }

    static showEditPrompt(task){
        UI.toggleCreateButtonVisibility(false);
        
        const dialog = document.querySelector("dialog");
        const title = document.querySelector("#dialog-title");
        const description = document.querySelector("#dialog-description");
        const priority = document.querySelector(`input[name="priority"]#${task.getPriority()}`);
        const date = document.querySelector("#dialog-due-date");
        const form = document.querySelector("form");
        
        const editButton = document.createElement("button");
        editButton.setAttribute("id","edit-task");
        editButton.textContent = "Edit Task!"
        title.value = task.getTitle();
        description.value = task.getDescription();
        priority.click(); 

        date.value = task.getDate() ? format(task.getDate(), "yyyy-MM-dd") : "";    
        UI.toggleCreateButtonVisibility(false);
        form.appendChild(editButton);
        
        dialog.showModal();
        
        editButton.addEventListener("click", (e) => {
            const priority = document.querySelector('input[name="priority"]:checked');
            if(!form.checkValidity()){
                form.reportValidity();
            } else {
                e.preventDefault();
                UI.updateTask(task,title.value,description.value,false,priority.value,date.value);
                UI.resetDialog();
            }
        });
    }

    static updateTask(task,title,description,isChecked,priority,date){
        let formattedDate = "";
        if(date){
            date = new Date(date.replace(/-/g, '/')); //used to prevent date_fns bug, in which day gets set back 1 day due to hyphen
            formattedDate = format(date, 'MM/dd/yyyy');
        } 
        const newTask = new Task(title,description,isChecked,priority,formattedDate);
        Storage.updateTask(task,newTask,UI.getCurrentProject());
        UI.loadTasks(UI.getCurrentProject());
    }

    static deleteTask(task){
        Storage.deleteTask(task.getTitle(), this.getCurrentProject());
        UI.loadTasks(UI.getCurrentProject());
    }


    static resetDialog() {
        const dialog = document.querySelector("dialog");
        const title = document.querySelector("#dialog-title");
        const description = document.querySelector("#dialog-description");
        const lowPrio = document.querySelector('input[name="priority"]#low');
        const date = document.querySelector("#dialog-due-date");
        const form = document.querySelector("form");
        const editButton = document.querySelector("#edit-task");
        dialog.close();

        title.value = ""
        description.value = ""
        lowPrio.click(); 
        date.value = "";

        if(editButton!= undefined) {
            form.removeChild(editButton);
        }

        UI.toggleCreateButtonVisibility(true);
    }

    static toggleCreateButtonVisibility(bool){
        const createButton = document.querySelector("#create-task");
        if(bool){
            createButton.classList.remove("hide");
        } else {
            createButton.classList.add("hide");
        }
        }
        


}





