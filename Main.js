'use strict';

var React = require('react-native');
var FrustratedNugget = require('./Creature');
var nm = require('./CreatureManager');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableHighlight,
} = React;

function toast(msg){
    ToastAndroid.show(msg, ToastAndroid.SHORT);
}

async function newCurrentNugget(){
   console.log("about to get a new nugget!"); 

   var names = ["Amanda", "Andrew", "Leanne", "Sloth", "Timbo", "Jesus", 
                "Charlie", "Steve", "Magnus", "George", "Darci", "Brent"];

  var randomName = names[Math.floor(Math.random() * names.length)];
  var stressValue = Math.ceil(Math.random() * 10);

   var newCurrent =  await nm.setNewCurrent(new FrustratedNugget(randomName, stressValue, false));
   console.log("\t", newCurrent, stressValue);
   return newCurrent;
}

async function calm(){
   var updated = await nm.calmCurrentCreature();
   if(!updated){
       updated = await newCurrentNugget();
   }
   this.setState({currentCreature : updated});

}

var Main = React.createClass({
  

  getInitialState: function() {
    return {currentCreature: {name: "no nuggets in sight!"} };
  },
  componentDidMount: function() {
        
      nm.init().then(() => {
        if(nm.hasCurrentNugget()){
            this.setState({currentCreature : nm.current});
        }
      });

  },
  _onPressButton : function(){

      calm.bind(this)();

  },
  _newNugget : function(){
      
    newCurrentNugget()
        .then((data) => {
            this.setState({currentCreature : data})
        });
        
  },
  render: function() {
    return (
      <Image source={require('./images/meditating_sloth.jpg')} style={styles.background}>      
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to Frustrated Nuggets, Andrew! 
            </Text>
            <Text style={styles.welcome}>
                Your nugget is named {this.state.currentCreature.name} 
            </Text>
            <Text style={styles.welcome}>
                stress level = {this.state.currentCreature.stressLevel} 
            </Text>
            <TouchableHighlight onPress={this._onPressButton}>
                <Text>I just meditated</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._newNugget}>
                <Text>get a Nugget</Text>
            </TouchableHighlight>
          </View>
      </Image>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  background : {
    flex: 1,
    width: null,
    height: null,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Main;
