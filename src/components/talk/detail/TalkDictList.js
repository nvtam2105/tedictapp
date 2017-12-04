import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, ActivityIndicator, Alert } from "react-native";

//import { CardSection, Thumbnail } from '../../common';

import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Card, Heading,
    Subtitle, Tile, Title, Overlay, Icon, Button
} from '@shoutem/ui';

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';

import store from '../../../stores';

class TalkDictList extends Component {

    componentWillMount() {
        this.setState({
            talk: this.props.talk,
            purchased: this.props.purchased,
        });
    }

    componentDidMount() {
        Actions.refresh({ title: this.props.talk.name });
    }


    componentWillReceiveProps() {
        this.setState({
            talk: store.getTalkById(this.props.talk.id),
        });
    }


    render() {
        return (
            <StyleProvider style={defaultTheme()}>
                <FlatList style={{ flex: 1 }}
                    data={this.state.talk.script.sens}
                    renderItem={({ item, index }) => (<View style={{ flex: 1 }}>
                        <Button styleName="full-width" onPress={() => {``
                            //console.log('TalkDictList=' + index);
                            {
                                (!this.state.purchased && index >10) && (
                                    Alert.alert('Please purchase this app')
                                )
                            }
                            {
                                (this.state.purchased || index <= 10) && this.props.isFillGap && (
                                    Actions.talkDictSwiper(
                                        {
                                            talk: this.state.talk,
                                            selectedIndex: item.completed_gap ? index : index - 1,
                                            isFillGap: this.props.isFillGap,
                                        }
                                    )
                                )
                            }
                            {
                                (this.state.purchased || index <= 10) && !this.props.isFillGap && (
                                    Actions.talkDictSwiper(
                                        {
                                            talk: this.state.talk,
                                            selectedIndex: item.completed_dict ? index : index - 1,
                                            isFillGap: this.props.isFillGap,
                                        }
                                    )
                                )
                            }
                        }} >

                            {!this.props.isFillGap 
                                && (<Title style={{ color: item.completed_dict ? 'red' : 'black' }}>{item.completed_dict ? 
                                                        (this.state.purchased || index < 10 ? "OK" : `${++index}-LOCK`): 
                                                        (this.state.purchased || index < 10 ? `${++index}` : `${++index}-LOCK`)}</Title>)}
                            {this.props.isFillGap 
                                && (<Title style={{ color: item.completed_gap ? 'red' : 'black' }}>{item.completed_gap ? 
                                                        (this.state.purchased || index < 10 ? "OK" : `${++index}-LOCK`): 
                                                        (this.state.purchased || index < 10 ? `${++index}` : `${++index}-LOCK`)}</Title>)}
                        </Button>
                    </View>)}
                    keyExtractor={item => item._id}
                    numColumns={4}
                />
            </StyleProvider>
        );
    }
}

export default TalkDictList;