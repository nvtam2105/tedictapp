import React from 'react';
import { PropTypes } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import SearchBar from 'react-native-searchbar';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    //borderWidth: 2,
    //borderColor: 'red',
  },
});

class SearchTalk extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
      </View>
    );
  }
}
SearchTalk.contextTypes = contextTypes;
SearchTalk.propTypes = propTypes;

export default SearchTalk;
