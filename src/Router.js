import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import TalkList from './components/TalkList';
import TalkDetail from './components/TalkDetail';
import TalkVideo from './components/TalkVideo';
import TalkScript from './components/TalkScript';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ }}>
        <Scene key="main">
          <Scene
            onRight={() => Actions.employeeCreate()}
            rightTitle="Add"
            key="talkList"
            component={TalkList}
            title="TED Talks"
            initial
          />
          <Scene key="talkDetail" component={TalkDetail} backTitle=" " hideNavBar={false}/>
          <Scene key="talkVideo" component={TalkVideo} backTitle=" "/>
          <Scene key="talkScript" component={TalkScript} backTitle=" "/>
      </Scene>
    </Router>
  );
};

export default RouterComponent;