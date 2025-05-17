export default class TimeDisplay {
    constructor (id) {
        this.element = document.getElementById(id);
    }
    update() {
        this.now = new Date();
        this.element.innerText = this.now;    
    }
}