import { format } from 'date-fns/format'

export default class Task {
    constructor(title,description,isChecked,priority,date){
        this.title = title;
        this.description = description
        this.isChecked = isChecked;
        this.priority = priority;
        this.date = date;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getPriority(){
        return this.priority;
    }

    getDate() {
        return this.date;
    }

    


}