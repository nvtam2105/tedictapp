import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Intro from 'react-native-app-intro';
import PropTypes from 'prop-types';
import { iconsMap, iconsLoaded } from '../icons/iconSource';

import store from '../../stores';

import { Actions } from 'react-native-router-flux';

class AppIntro extends Component {

  componentDidMount() {
    store.setItem('firstLaunch', "false");
  }

  doneBtnHandle = () => {
    Actions.drawer();
  }

  render() {
    const pageArray = [{
      title: 'Introduction',
      description: 'Discover new facts about getting healthy,wealthy and wise everyday',
      img: iconsMap['ios-flower'],
      imgStyle: {
        height: 150,
        width: 150,
        resizeMode: "contain"
      },
      backgroundColor: '#03A9F4',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Healthy',
      description: 'This section covers all articles related to workouts, medicines and general healthcare',
      img: iconsMap['ios-pulse'],
      imgStyle: {
        height: 200,
        width: 200,
        resizeMode: "contain"
      },
      backgroundColor: '#F44336',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Wealthy',
      description: 'This section covers all articles related to managing finances, generating wealth and long term investment plans',
      img: iconsMap['ios-cash'],
      imgStyle: {
        height: 200,
        width: 200,
        resizeMode: "contain"
      },
      backgroundColor: '#009688',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Wise',
      description: 'This section covers all articles related to interesting facts, stories of rise of famous personalities and much more',
      img: iconsMap['ios-bulb'],
      imgStyle: {
        height: 200,
        width: 200,
        resizeMode: "contain"
      },
      backgroundColor: '#FBC02D',
      fontColor: '#fff',
      level: 10,
    }];

    return (
      <Intro
        customStyles={{ btnContainer: { flex: 1 } }}
        showSkipButton={false}
        onDoneBtnClick={this.doneBtnHandle}
        pageArray={pageArray}
      />
    );
  }
}

export default AppIntro;