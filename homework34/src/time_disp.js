export default class TimeDisplay {
    constructor (id, background) {
        this.element = document.getElementById(id);
        this.background = background;
    }
    update() {
        this.now = new Date();
        this.element.innerText = this.now;    
    }
    getBackground() {
        return this.background;    
    }
}