'use strict'

var React = require('react-native');


var {
    Text,
    View,
} = React;


var NuggetList = React.createClass({

    render : function(){
        return (
                <View>
                    <Text>
                    List of Nuggets
                    </Text>
                </View>
                );

    }
});

module.exports = NuggetList
