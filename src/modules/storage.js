
/* 
localStorage vars:
    "projectList" - an array containing project objects

*/

import Task from "./task";

export default class Storage {

    static getProjectListArr() {
        if(!localStorage.getItem("projectList")){

            localStorage.setItem("projectList", JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem("projectList"));
        
    }

    static getTaskArr(project){
        if(!localStorage.getItem(project)){
            localStorage.setItem(project, JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem(project));
    }


    /* in order to store objects in localStorage, must first convert to a string and then add that to 
    the localStorage, JSON.parse and JSON.stringify are our friends here :)*/
    static addProject(proj) {
        const projStr = JSON.stringify(proj);
        let projArr = Storage.getProjectListArr();
        
        if(projArr.includes(projStr) || projStr == "Main"){
            return;
        }
        projArr.push(projStr);

        localStorage.setItem("projectList", JSON.stringify(projArr));
    }

    static addTask(task,project){
        const taskStr = JSON.stringify(task);

        let projectArr = Storage.getTaskArr(project);
        projectArr.push(taskStr);

        localStorage.setItem(project,JSON.stringify(projectArr));

    }

    static getTask(taskName, project){
        let projectArr = Storage.getTaskArr(project);

        /* needs refactoring, currently parse and create JSON into task object, then get name*/
        const taskIndex = projectArr.findIndex( (task) => {
            const taskObject = Object.assign(new Task, JSON.parse(task));
            return taskName == taskObject.getTitle()
        });
        
        return taskIndex
    }

    static deleteTask(taskName,project) {
        const indexToReplace = Storage.getTask(taskName,project);
        let projectArr = Storage.getTaskArr(project);

        projectArr.splice(indexToReplace,1);

        localStorage.setItem(project,JSON.stringify(projectArr));
    }

    static updateTask(task,newTask,project){
        const indexToReplace = Storage.getTask(task.getTitle(),project);
        let projectArr = Storage.getTaskArr(project);
        const taskStr = JSON.stringify(newTask);

        if(indexToReplace != -1){
            projectArr[indexToReplace] = (taskStr);
            localStorage.setItem(project,JSON.stringify(projectArr));
        } 
        
    
    }
}