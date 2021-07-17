export default class Reference {

    constructor(options = {}) {
        Object.assign(this, options);
    }

    function1() {
        return this.author + this.year;
    }

    static funtion2() {

    }

}