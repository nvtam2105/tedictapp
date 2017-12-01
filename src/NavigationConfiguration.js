import React, { Component } from 'react';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';

import { combineReducers } from 'redux';
import { connect } from 'react-redux';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIntro from './components/intro/AppIntro';
import SlideMenu from './components/menu/SlideMenu';
import HomePage from './components/home/HomePage';
import TalkNewestList from './components/talk/home/TalkNewestList';
import TalkMarkList from './components/talk/home/TalkMarkList';
import TalkSearch from './components/talk/home/TalkSearch';
import TalkDetail from './components/talk/detail/TalkDetail';
import TalkVideo from './components/talk/detail/TalkVideo';
import TalkScript from './components/talk/detail/TalkScript';
import TalkDictList from './components/talk/detail/TalkDictList';
import TalkDictItem from './components/talk/detail/TalkDictItem';
import TalkDictSwiper from './components/talk/detail/TalkDictSwiper';

export const TabBar = TabNavigator({
  TalkNewestList: { screen: TalkNewestList },
  TalkMarkList: { screen: TalkMarkList },
  TalkSearch: { screen: TalkSearch },
}, {
  tabBarOptions: { 
    animationEnabled: true,
    activeTintColor: '#900',
    //inactiveTintColor: colors.grey2,
    labelStyle: {
      fontSize: 12,
      fontWeight: '600'
    }
  }
});

const initialState = TabBar.router.getStateForAction(TabBar.router.getActionForPathAndParams('TalkNewestList'));

export const tabBarReducer = (state = initialState, action) => {
  const nextState = TabBar.router.getStateForAction(action, state);
  return nextState || state;
};
