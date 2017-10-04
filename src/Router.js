import React from 'react';
import { Image, StyleSheet } from "react-native";

import { Scene, Router, Drawer, Tabs, Stack } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import TalkList from './components/TalkList';
import TalkDetail from './components/TalkDetail';
import TalkVideo from './components/TalkVideo';
import TalkScript from './components/TalkScript';

import DrawerContent from './components/DrawerContent';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';



const menuIcon = (<Icon name="bars" size={25} />);
const backImage = Icon.getImageSource('bars', 25).then((source) => (<Image source={source} />));

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Drawer hideNavBar key="drawer" contentComponent={DrawerContent} drawerIcon={menuIcon}>
                    <Scene hideNavBar>
                        <Tabs
                            key="tabbar"
                            swipeEnabled
                            showLabel={false}
                            tabBarStyle={styles.tabBarStyle}
                            activeBackgroundColor="white"
                            inactiveBackgroundColor="rgba(255, 0, 0, 0.5)">

                            <Scene key="talkList" component={TalkList} title="Newest" initial icon={TabIcon} rightTitle="Right1" onRight={() => { }} />
                            <Scene key="tab_2_1" component={TabView} title="Tab #2" icon={TabIcon} rightTitle="Right2" onRight={() => { }} />
                            <Scene key="tab_2" component={TabView} title="Tab #3" icon={TabIcon} rightTitle="Right3" onRight={() => { }}
                            />
                        </Tabs>
                    </Scene>
                </Drawer>

                <Scene key="talkDetail" component={TalkDetail} backTitle=" " leftButtonImage={backImage} />
                <Scene key="talkVideo" component={TalkVideo} backTitle=" " leftButtonImage={backImage} />
                <Scene key="talkScript" component={TalkScript} backTitle=" " leftButtonImage={backImage} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;