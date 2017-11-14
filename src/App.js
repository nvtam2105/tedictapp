import React, { Component } from 'react';
import { AppState, Platform, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Clipboard } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

import FCM from "react-native-fcm";
import PushController from "./firebase/PushController";
import firebaseClient from "./firebase/FirebaseClient";

import store from './stores';

class App extends Component {

  componentWillMount() {
    store.getItem('firstLaunch').then((value) => {
      this.setState({
        firstLaunch: value !== null || value === 'true'
      })
    });


  }

  render() {
    const logger = (store) => (next) => (action) => {
      let previous = JSON.stringify(store.getState())
      next(action)
      // console.log(
      //     'action: ' + JSON.stringify(action) +
      //     '\n\tprevious: ' + previous +
      //     '\n\tcurrent: ' + JSON.stringify(store.getState())
      // )
    }

    const store = createStore(reducers, {}, applyMiddleware(thunk, logger));

    return (
      <Provider store={store}>
        <Router firstLaunch={this.state.firstLaunch === null} />
      </Provider >
    );
  }
}

export default App;