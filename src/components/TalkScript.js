import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList } from "react-native";
import { connect } from 'react-redux';

import { scriptFetch } from '../actions';


class TalkScript extends Component {

    componentWillMount() {
        console.log(this.props.talk);
        
        this.props.scriptFetch(this.props.talk.id);
        
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
    };

    render() {
        return (
            <FlatList style={{flex:1}}
                data={this.props.script.sens}
                renderItem={({ item, index }) => (<Text>{index+1} - {item.content}</Text>)}
                ItemSeparatorComponent={this.renderSeparator}                          
        />
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return { script: state.script };
};
  
const mapDispatchToProps = {scriptFetch};

export default connect(mapStateToProps, mapDispatchToProps)(TalkScript);
