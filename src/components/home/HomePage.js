import React, { Component } from 'react';
import { PropTypes } from "react";
import { StyleSheet, Text, View, ViewPropTypes, Image, TouchableWithoutFeedback } from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

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
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'transparent',
    //resizeMode: "cover",
    //justifyContent: 'center',
    justifyContent: 'space-between',
    //alignItems: 'center',
    alignSelf: 'stretch',
    padding: 10,

    //alignSelf: 'flex-start'
    //paddingTop: 10,
    //paddingBottom: 10,

  },
  stretch: {
    flex: 1,
    //padding: 10,
    height: undefined, 
    width: undefined,
    //alignSelf: 'stretch',
    //paddingBottom: 10,
    //padding: 10,
    //borderWidth: 10,
    //borderRadius: 10,
    // resizeMode: "contain",
    //paddingLeft: 10,
    //paddingRight: 10
    //resizeMode: 'stretch',
  }
});

class HomePage extends Component {

  render() {
    const { stretch } = styles;
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <View style={{flex: 1, padding: 10}}>
          <TouchableWithoutFeedback onPress={Actions.talkList}>
            <Image style={stretch} source={require('../../../assets/img/ted_bg.png')} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <TouchableWithoutFeedback onPress={Actions.talkList}>
            <Image style={stretch} source={require('../../../assets/img/bbc_bg.png')} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <TouchableWithoutFeedback onPress={Actions.talkList}>
            <Image style={stretch} source={require('../../../assets/img/cnn_bg.png')} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

HomePage.contextTypes = contextTypes;
HomePage.propTypes = propTypes;

export default HomePage;
