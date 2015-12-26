
'use strict'
class FrustratedNugget {

    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    roar() {
       return this.name;
    }
}

module.exports = FrustratedNugget;
