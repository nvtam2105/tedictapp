import React, { Component } from 'react';

import { StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Scene, Router, Drawer, Tabs, Stack, Actions } from 'react-native-router-flux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppIntro from './components/intro/AppIntro';
import SlideMenu from './components/menu/SlideMenu';
import HomePage from './components/home/HomePage';
import TalkNewestList from './components/talk/home/TalkNewestList';
import TalkMarkList from './components/talk/home/TalkMarkList';
import TalkSearch from './components/talk/home/TalkSearch';
import TalkDetail from './components/talk/detail/TalkDetail';
import TalkVideo from './components/talk/detail/TalkVideo';
import TalkScript from './components/talk/detail/TalkScript';
import TalkDictList from './components/talk/detail/TalkDictList';
import TalkDictItem from './components/talk/detail/TalkDictItem';
import TalkDictSwiper from './components/talk/detail/TalkDictSwiper';


import { Icon, Text, Image, View, Button, TouchableOpacity } from '@shoutem/ui';

import store from './stores';


const menuIcon = (<MaterialIcons name="menu" size={25} color={'#900'} />);

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

    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <MaterialIcons name="format-list-bulleted" color={props.focused ? '#900' : 'black'} size={25} />
        <Text style={{ fontSize: 11, color: props.focused ? '#900' : 'black' }}>Discover</Text>
    </View>);

};

const myListIcon = (props) => {
    //console.log(props);
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <MaterialIcons name="star-border" color={props.focused ? '#900' : 'black'} size={25} />
        <Text style={{ fontSize: 11, color: props.focused ? '#900' : 'black' }}>My Talks</Text>
    </View>);
};

const searchIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <MaterialIcons name="search" color={props.focused ? '#900' : 'black'} size={25} />
        <Text style={{ fontSize: 11, color: props.focused ? '#900' : 'black' }}>Search</Text>
    </View>);
};

const bookmarkIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 7 }}>
        <Icon name="page" color={props.focused ? '#900' : 'black'} />
        <Text style={{ fontSize: 12, color: props.focused ? '#900' : 'black' }}>Bookmark</Text>
    </View>);
};


const notificationIcon = (props) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <MaterialIcons name="notifications-none" color={props.focused ? '#900' : 'black'} size={25} />
        <Text style={{ fontSize: 11, color: props.focused ? '#900' : 'black' }}>Notifications</Text>
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

class RouterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstLaunch: true,
            loading: false,
        };
    };

    componentWillMount() {
        store.getItem('firstLaunch').then((value) => {
            if (value && value === 'false') {
                this.setState({
                    firstLaunch: false,
                    loading: true,
                });
            } else {
                this.setState({
                    loading: true,
                });
            }
        });

    }
    render() {
        if (!this.state.loading) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><ActivityIndicator animating size="large" /></View>;;
        } else {
            return (
                <Router>
                    <Scene key="root">
                        <Scene key="appIntro" component={AppIntro} hideNavBar initial={this.state.firstLaunch} />
                        <Drawer hideNavBar key="drawer" contentComponent={SlideMenu} drawerIcon={menuIcon}
                            initial={!this.state.firstLaunch}
                            openDrawerOffset={10}>
                            {/* <Scene key="home">
                        <Scene key="homePage" component={HomePage} initial />

                    </Scene> */}
                            <Scene hideNavBar >
                                <Tabs
                                    tabBarPosition="bottom"
                                    key="tabbar"
                                    swipeEnabled={false}
                                    showLabel={false}
                                //tabBarStyle={styles.tabBarStyle}

                                //inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                                //activeBackgroundColor="white"
                                >

                                    <Scene key="TalkNewestList" title="Discover" component={TalkNewestList} icon={newestIcon}

                                    //renderRightButton={rightButton} 
                                    />

                                    <Scene key="talkMarkList" title="My Talks" component={TalkMarkList} icon={myListIcon}
                                    //onRight={() => Actions.searchTalk()}
                                    //rightTitle="right"
                                    //renderRightButton={rightButton}
                                    />

                                    <Scene key="nofitications" hideNavBar title="Notifications" component={TalkSearch} icon={notificationIcon}
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
                        <Scene key="talkDictSwiper" component={TalkDictSwiper} backTitle=" "
                            onBack={() => { Actions.pop({ refresh: { test: Math.random() } }) }} />
                        <Scene key="talkDictItem" component={TalkDictItem} />


                    </Scene>
                </Router>
            );
        }
    }
};

export default RouterComponent;