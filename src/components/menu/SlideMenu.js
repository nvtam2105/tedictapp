import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class SlideMenu extends Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: React.PropTypes.object,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Drawer Content</Text>
        <Button onPress={Actions.talkList}>Back</Button>
      </View >
    );
  }
}

export default SlideMenu;
