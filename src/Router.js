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
import InAppPurchase from "./libs/InAppPurchase";
const product = 'com.tinyworld.tedictapp';

const menuIcon = (<MaterialIcons name="menu" size={25} color={'#900'} />);
const TabIcon = (props) => {
    var color = props.focused ? '#900' : 'tintColor';
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
            <MaterialIcons style={{ color: color, paddingVertical: 3 }} name={props.iconName || "circle"} size={25} />
            <Text style={{ color: color, fontSize: 11 }}>{props.title}</Text>
        </View>
    );
}

class RouterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstLaunch: true,
            purchased: false,
            loading: true,
        };
    };

    componentWillMount() {
        store.getItem('firstLaunch').then((value) => {
            if (value && value === 'false') {
                this.setState({
                    firstLaunch: false,
                    loading: false,
                });
            } else {
                this.setState({
                    loading: false,
                });
            }
        });

        InAppPurchase.restorePurchase(product).then(function (error, response) {
            if (error) {
                Alert.alert('itunes Error', 'Could not connect to itunes store.');
            } else {
                if (response.length === 0) {
                    Alert.alert('No Purchases', "We didn't find any purchases to restore.");
                    return;
                }
                response.forEach((purchase) => {
                    if (purchase.productIdentifier === product) {
                        Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
                        this.setState({
                            purchased: true,
                        });
                    }
                });
            }
        });

    }
    render() {
        if (this.state.loading) {
            return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><ActivityIndicator animating size="large" /></View>;;
        } else {
            return (
                <Router {...this.state}>
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

                                //inactiveTintColor="rgba(255, 0, 0, 0.5)"
                                //activeTintColor="#9000"
                                >

                                    <Scene key="TalkNewestList" title="Discover" component={TalkNewestList}
                                        iconName="format-list-bulleted"
                                        icon={TabIcon}
                                    //renderRightButton={rightButton} 
                                    />

                                    <Scene key="talkMarkList" title="My Talks" component={TalkMarkList}
                                        iconName="star-border"
                                        icon={TabIcon}
                                    //onRight={() => Actions.searchTalk()}
                                    //rightTitle="right"
                                    //renderRightButton={rightButton}
                                    />

                                    {/* <Scene key="nofitications" hideNavBar title="Notifications" component={TalkSearch} icon={notificationIcon}
                                        renderRightButton={rightButton} /> */}

                                    {/* <Scene key="takSearch1" hideNavBar title="My Bookmark" component={TalkSearch} icon={bookmarkIcon}
                                renderRightButton={rightButton} /> */}

                                    <Scene key="takSearch" hideNavBar title="Search" component={TalkSearch}
                                        iconName="search"
                                        icon={TabIcon}
                                    // renderRightButton={rightButton} 
                                    />


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