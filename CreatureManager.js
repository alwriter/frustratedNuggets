'use strict'

var FrustratedNugget = require('./Creature');
var reactNativeStore = require('react-native-store');
var React = require('react-native');

var {
  AsyncStorage
} = React;


class CreatureManager {


    async getAllCreatures(){
        var nuggetModel = await reactNativeStore.model("nuggets");
        var results = await nuggetModel.find();
        return results;
   }

    async getCurrentCreature(){
        
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
        var nuggetModel = await reactNativeStore.model("nuggets");
        await nuggetModel.add(nugget);
    }

    async deleteCreature(id) {
        var nuggetModel = await reactNativeStore.model("nuggets");

    }

    async updateCreature(id) {
        var nuggetModel = await reactNativeStore.model("nuggets");
    }

    async clear() {
        await AsyncStorage.clear();
    }
}
module.exports = CreatureManager; 
