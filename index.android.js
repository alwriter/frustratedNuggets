/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var FrustratedNugget = require('./Creature');
var NuggetManager = require('./CreatureManager');
var nm = new NuggetManager();

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
} = React;

function toast(msg){
    ToastAndroid.show(msg, ToastAndroid.LONG);
}

async function testDB(){
    var test = {"test1": "testttttt"};
    var test2 = {"oh yeah 2" : "second is best"};
    console.log("beginning test db");
    await nm.clear();
    var test = await nm.getAllCreatures();
    console.log(test);

    await nm.addCreature(new FrustratedNugget(1, "tim", 5, true));
    await nm.addCreature(new FrustratedNugget(2, "bill", 5, false));
    await nm.addCreature(new FrustratedNugget(3, "adam", 5, true));

    var current = await nm.getCurrentCreature();
    console.log(current);

    var test2 = await nm.getAllCreatures();
    console.log(test2);
    console.log("end db test");
}

async function newCurrentNugget(){
    await nm.addCreature(new FrustratedNugget(null, "amanda", 5, true));
}

async function getCurrentNugget(){
    var current = await nm.getCurrentCreature();

    if(current === null){
        await newCurrentNugget();
        current = await nm.getCurrentCreature();
    }

    return current;
}


var frustratedNuggets = React.createClass({
  

  getInitialState: function() {
    return {currentCreature: {id: 1, name: "billary"} };
  },
  componentDidMount: function() {
    //testDB();
   getCurrentNugget().then(function(data){
        this.setState({currentCreature : data});
   }.bind(this));
   
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

AppRegistry.registerComponent('frustratedNuggets', () => frustratedNuggets);
