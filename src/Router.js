import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { Scene, Router, Drawer, Tabs, Stack } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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





const menuIcon = (<EvilIcons name="navicon" size={30} />);

const backImage = (props) => {
    return FontAwesome.getImageSource('bars', 25).then(
        (source) => (<Image source={source} />)
    );
}

const newestIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  padding: 5}}>
        <FontAwesome name="newspaper-o" size={25} color={props.focused ? '#900' : 'black'}/>
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black'}}>All Talks</Text>
    </View>);
};

const myListIcon = (props) => {
    console.log(props);
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
        <FontAwesome name="play-circle" size={25} color={props.focused ? '#900' : 'black'}/>
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black'}}>My List</Text>
    </View>);
};

const searchIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
        <EvilIcons name="search" size={30} color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black'}}>Search</Text>
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
                            <Scene key="myTalkList" title="My Dictation List" component={MyTalkList} icon={myListIcon} />
                            <Scene key="talkList" title=" Newest" component={TalkList} icon={newestIcon} />
                            <Scene key="searchTalk" hideNavBar title="Search" component={SearchTalk} icon={searchIcon} />
                        </Tabs>
                    </Scene>
                </Drawer>


                <Scene key="talkDetail" component={TalkDetail} backTitle=" " leftButtonImage={backImage} />
                <Scene key="talkVideo" component={TalkVideo} backTitle=" " leftButtonImage={backImage} />
                <Scene key="talkScript" component={TalkScript} backTitle=" " leftButtonImage={backImage} />
                <Scene key="talkDictList" component={TalkDictList} backTitle=" " leftButtonImage={backImage} />
                <Scene key="talkDictItem" component={TalkDictItem} leftButtonImage={backImage} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;