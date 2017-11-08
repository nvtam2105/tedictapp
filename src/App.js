import React, { Component } from 'react';
import { AppState, Platform, KeyboardAvoidingView } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

//import initPushNotification from './PushController';
//import PushNotification from 'react-native-push-notification';


class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //initPushNotification();
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (10 * 1000)) // in 60 secs

      if (Platform.OS === 'ios') {
        //date = date.toISOString();
      }

      // PushNotification.localNotificationSchedule({
      //   message: "My Notification Message",
      //   date,
      // });
    }
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
          <Router />
      </Provider >
    );
  }
}

export default App;