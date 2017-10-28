import React from 'react';
import { StyleSheet, Alert } from "react-native";
import { Scene, Router, Drawer, Tabs, Stack, Actions } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import SlideMenu from './components/menu/SlideMenu';
import HomePage from './components/home/HomePage';

import TalkNewestList from './components/talk/TalkNewestList';
import TalkMarkList from './components/talk/TalkMarkList';
import TalkSearch from './components/talk/TalkSearch';


import TalkDetail from './components/talk/detail/TalkDetail';
import TalkVideo from './components/talk/detail/TalkVideo';
import TalkScript from './components/talk/detail/TalkScript';
import TalkDictList from './components/talk/detail/TalkDictList';
import TalkDictItem from './components/talk/detail/TalkDictItem';





import { Icon, Text, Image, View, Button, TouchableOpacity } from '@shoutem/ui';


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
    Actions.talkSearch();
};
const newestIcon = (props) => {

    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 7 }}>
        <Icon name="page" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Discover</Text>
    </View>);

};

const myListIcon = (props) => {
    //console.log(props);
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 7 }}>
        <Icon name="add-to-favorites-off" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>My List</Text>
    </View>);
};

const searchIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 7 }}>
        <Icon name="search" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Search</Text>
    </View>);
};

const bookmarkIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 7 }}>
        <Icon name="page" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Bookmark</Text>
    </View>);
};


const notificationIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 7 }}>
        <Icon name="notifications" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Notification</Text>
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
                            swipeEnabled={false}
                            showLabel={false}
                        //tabBarStyle={styles.tabBarStyle}

                        //inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                        //activeBackgroundColor="white"
                        >

                            <Scene key="TalkNewestList" title=" Newest" component={TalkNewestList} icon={newestIcon}
                            //renderRightButton={rightButton} 
                            />

                            <Scene key="talkMarkList" title="My Dictation" component={TalkMarkList} icon={myListIcon}
                            //onRight={() => Actions.searchTalk()}
                            //rightTitle="right"
                            //renderRightButton={rightButton}
                            />

                            <Scene key="nofitication" hideNavBar title="Notifications" component={TalkSearch} icon={notificationIcon}
                                renderRightButton={rightButton} />

                             {/* <Scene key="takSearch1" hideNavBar title="My Bookmark" component={TalkSearch} icon={bookmarkIcon}
                                renderRightButton={rightButton} /> */}

                            <Scene key="takSearch" hideNavBar title="Search" component={TalkSearch} icon={searchIcon}
                                renderRightButton={rightButton} />

                            
                        </Tabs>
                    </Scene>
                </Drawer>


                <Scene key="talkDetail" component={TalkDetail} backTitle=" " />
                <Scene key="talkVideo" component={TalkVideo} backTitle=" " />
                <Scene key="talkScript" component={TalkScript} backTitle=" " />
                <Scene key="talkDictList" component={TalkDictList} backTitle=" " />
                <Scene key="talkDictItem" component={TalkDictItem} />
                
            </Scene>
        </Router>
    );
};

export default RouterComponent;