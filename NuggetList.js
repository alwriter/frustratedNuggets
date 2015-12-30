'use strict'

var React = require('react-native');
var nm = require('./CreatureManager');

var {
    Text,
    View,
    ListView,
    StyleSheet,
    Image,
} = React;


var NuggetList = React.createClass({

    getInitialState: function(){
        return {
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          loaded: false,
        };
    },
    componentDidMount : function(){
        this.init();
    },
    init : async function(){
        
        await nm.init();
        console.log("getting old nuggets"); 
        var oldNugs = await nm.getAllCreatures();

        
        var mockedNuggets = [{_id : 1, name: "Bilbo"},{_id: 2, name: "Pip"}];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(oldNugs),
            loaded : true,
        });
    },
    render : function(){
        return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderOldNugget}
                    style={styles.listView}
                />
                );

    },
    renderOldNugget : function(nug) {
        //var img = 'http://i.imgur.com/UePbdph.jpg';
        var img = 'https://pbs.twimg.com/profile_images/3556615913/596ad015578d03d08dce8571bde90eb9.jpeg';
        return (
                  <View style={styles.container}>
                    <Image
                      source={{uri: img}}
                      style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                      <Text style={styles.title}>{nug.name}</Text>
                    </View>
                  </View>
                );
    }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = NuggetList
