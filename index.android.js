/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var FrustratedNugget = require('./Creature');


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var test = new FrustratedNugget(1, "billy");

var frustratedNuggets = React.createClass({
  render: function() {
    return (
      <Image source={require('./images/meditating_sloth.jpg')} style={styles.background}>      
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to Frustrated Nuggets, {test.roar()}! 
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
