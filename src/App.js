import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

class App extends Component {
  
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
          </Provider> 
      );
    }
  }

export default App;