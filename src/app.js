import React from   'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import { Header } from './components/common';
import TalkList from './components/TalkList';

const App = () => {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
            <View>
                <Header headerText="TED Talks" />
                <TalkList />
            </View>
        </Provider>
    )
}

export default App;