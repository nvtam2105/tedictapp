import React from 'react';
import { Scene, Router, Actions, DefaultRenderer, Stack } from 'react-native-router-flux';

import TalkList from './components/TalkList';
import TalkDetail from './components/TalkDetail';
import TalkVideo from './components/TalkVideo';
import TalkScript from './components/TalkScript';

import SideMenu from 'react-native-side-menu';
import DrawerNavigation from './components/DrawerNavigation';
import NavigationDrawer from './components/NavigationDrawer';




const RouterComponent = () => {
  return (
      <Router>
            <Scene key='drawer' 
                onEnter={() => {console.log('Enter')}}
                drawerImage={require('../assets/images/menu_ic.png')} component={NavigationDrawer}
                open={false}>
                <Scene key="talkList"  component={TalkList} title="TED Talks" initial />
                <Scene key="talkDetail" component={TalkDetail} backTitle=" " hideNavBar={false}/>
                <Scene key="talkVideo"  component={TalkVideo} backTitle=" "/>
                <Scene key="talkScript" component={TalkScript} backTitle=" "/>
            </Scene>
      </Router>
  );
};

export default RouterComponent;