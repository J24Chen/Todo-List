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
    }

    removeTask(task){
        this.tasks.filter(i => i != task);
    }



}