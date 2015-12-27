
'use strict'
class FrustratedNugget {

    constructor(id, name, stressLevel, archived){
        this.id = id;
        this.name = name;
        this.stressLevel = stressLevel;
        this.archived = archived;
    }

    roar() {
       return this.name;
    }
}

module.exports = FrustratedNugget;
