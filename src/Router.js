import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import { Scene, Router, Drawer, Tabs, Stack, Actions } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import TalkList from './components/talk/TalkList';
import TalkDetail from './components/talk/TalkDetail';
import TalkVideo from './components/talk/TalkVideo';
import TalkScript from './components/talk/TalkScript';
import TalkDictList from './components/talk/TalkDictList';
import TalkDictItem from './components/talk/TalkDictItem';
import MyTalkList from './components/talk/MyTalkList';
import SearchTalk from './components/talk/SearchTalk';
import SlideMenu from './components/menu/SlideMenu';
import HomePage from './components/home/HomePage';


import { Icon, Text, Image, View, } from '@shoutem/ui';


const menuIcon = (<Icon name="sidebar" size={30} />);

const backImage = (props) => {
    return FontAwesome.getImageSource('bars', 25).then(
        (source) => (<Image source={source} />)
    );
}

const rightButton = (props) => {
    return (
        <TouchableOpacity onPress={() => Actions.searchTalk()}>
            
                <Foundation name="filter" size={25} />
            
        </TouchableOpacity>
        

    );
}
const actionRightButton = () => {
    Alert.alert('hi');
    Actions.searchTalk();
};
const newestIcon = (props) => {

    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
        <Icon name="social-wall" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Discover</Text>
    </View>);

};

const myListIcon = (props) => {
    //console.log(props);
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <Icon name="play" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>My List</Text>
    </View>);
};

const searchIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
        <Icon name="search" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Search</Text>
    </View>);
};

const TabIcon = ({ selected, title }) => (
    myListIcon
);



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
                <Drawer hideNavBar key="drawer" contentComponent={SlideMenu} drawerIcon={menuIcon}
                    openDrawerOffset={10}>
                    {/* <Scene key="home">
                        <Scene key="homePage" component={HomePage} initial />

                    </Scene> */}


                    <Scene hideNavBar>
                        <Tabs
                            tabBarPosition="bottom"
                            key="tabbar"
                            swipeEnabled
                            showLabel={false}
                        //tabBarStyle={styles.tabBarStyle}

                        //inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                        //activeBackgroundColor="white"
                        >
                            
                            <Scene key="talkList" title=" Newest" component={TalkList} icon={newestIcon}
                                //renderRightButton={rightButton} 
                                />

                            <Scene key="myTalkList" title="My Dictation List" component={MyTalkList} icon={myListIcon}
                                //onRight={() => Actions.searchTalk()}
                                //rightTitle="right"
                                //renderRightButton={rightButton}
                            />

                          
                           
                            <Scene key="searchTalk" hideNavBar title="Search" component={SearchTalk} icon={searchIcon}
                                renderRightButton={rightButton} />
                        </Tabs>
                    </Scene>
                </Drawer>


                <Scene key="talkDetail" component={TalkDetail} backTitle=" "  />
                <Scene key="talkVideo" component={TalkVideo} backTitle=" "  />
                <Scene key="talkScript" component={TalkScript} backTitle=" " />
                <Scene key="talkDictList" component={TalkDictList} backTitle=" " />
                <Scene key="talkDictItem" component={TalkDictItem} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;