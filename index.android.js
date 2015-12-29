'use strict';

var React = require('react-native');
var MainScreen = require('./Main.js');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

var frustratedNuggets = React.createClass({

    render: function(){
        return (
                <Navigator 
                    initialRoute={{id : "MainPage", name : "Index"}}
                    renderScene={this.renderScene}
                />
                
                );
    },
    renderScene : function(route, navigator){
        var routeId = route.id;

        if(routeId == "MainPage"){
            return (<MainScreen navigator={navigator}></MainScreen>)
        }
    }
});

AppRegistry.registerComponent('frustratedNuggets', () => frustratedNuggets);
