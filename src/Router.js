import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import TalkList from './components/TalkList';
import TalkDetail from './components/TalkDetail';
import TalkVideo from './components/TalkVideo';
import TalkScript from './components/TalkScript';
import DrawerContent from './components/DrawerContent';

const menuIcon = (<Icon name="bars" size={25}/>);

const RouterComponent = () => {
  return (
      <Router>
        <Scene key="root">
            <Drawer hideNavBar key="drawer" contentComponent={DrawerContent} drawerIcon={menuIcon}>
                <Scene key="talkList" component={TalkList} title="TED Talks" initial />
            </Drawer>
            <Scene key="talkDetail" component={TalkDetail} backTitle=" "/>
            <Scene key="talkVideo"  component={TalkVideo} backTitle=" "/>
            <Scene key="talkScript" component={TalkScript} backTitle=" "/>
        </Scene>
      </Router>
  );
};

export default RouterComponent;