'use strict'

var FrustratedNugget = require('./Creature');
var reactNativeStore = require('react-native-store');
var React = require('react-native');

class CreatureManager {

    objToNug(obj){
        var nug = 
            new FrustratedNugget(obj.name, 
                                 obj.stressLevel, 
                                 obj.archived);
        nug._id = obj.id;
        return nug;
    }

    async loadCurrent(){
        
        var nuggetModel = await reactNativeStore.model("nuggets");
        var nuggets = await this.getAllCreatures();

        for(var i = 0; i < nuggets.length; i++){
            if(!nuggets[i].archived){
                return nuggets[i];
            }
        }
        return null;
    }

    async addCreature(nugget) {
       var added = await this.nuggetModel.add(nugget);
       return added;
    }

    hasCurrentNugget(){ this.current ? true : false;}

    async init(){
        this.nuggetModel = await reactNativeStore.model("nuggets");
        this.current = await this.loadCurrent();
    }

    async setNewCurrent(nug) {
        var newCurrent = await this.addCreature(nug);
        this.current = newCurrent;
        return this.current;
    }

    async getAllCreatures(){
        var results = await this.nuggetModel.find();
        return results;
   }

    getCurrentCreature(){
        return this.current;
    }

    async deleteCreature(id) {

    }

    async updateCreature(nug) {
        var wtf = nug._id;
        var updated = await this.nuggetModel.updateById(nug, wtf);
        nug._id = wtf;
        return nug;
    }

    async calmCurrentCreature(){
        
        this.current.stressLevel = this.current.stressLevel - 1;
        if(this.current.stressLevel === 0){
            //archive them!
            this.current.archived = true;
            await this.updateCreature(this.current);
            return null;
        }
        await this.updateCreature(this.current);
        return this.current;

    }

    async test(){

    }
    
}

module.exports = new CreatureManager(); 
