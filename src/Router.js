import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import TalkList from './components/TalkList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          key="talkList"
          component={TalkList}
          title="TED Talks"
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;