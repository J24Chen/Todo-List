import Storage from "./storage";

export default class Project {
    constructor(name){
        this.name = name
        this.tasks = [] 
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name; 
    }

    setTasks(tasks) {
        this.tasks = tasks; 
    }

    getTask(taskTitle) {
        this.tasks.find((i) => i.getTitle == taskTitle);
    }

    addTask(task){
        this.tasks.push(task);
        console.log(this.tasks);
        Storage.addTask(task,this.name);
    }

    removeTask(task){
        this.tasks.filter(i => i != task);
    }



}