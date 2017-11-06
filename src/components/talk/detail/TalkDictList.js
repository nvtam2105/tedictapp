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


class TalkDictList extends Component {

    componentWillMount() {
        this.setState({
            sens: this.props.talk.script.sens,

        });
    }

    componentDidMount() {
        Actions.refresh({ title: this.props.talk.name });
    }

    render() {
        return (
            <StyleProvider style={defaultTheme()}>
                <FlatList style={{ flex: 1 }}
                    data={this.state.sens}
                    renderItem={({ item, index }) => (<View style={{ flex: 1 }}>
                        <Button styleName="full-width" onPress={() =>
                            Actions.talkDictSwiper(
                                {
                                    talk: this.props.talk,
                                    selectedIndex: index - 1,
                                    isFillGap: this.props.isFillGap,
                                    completed: this.props.isFillGap ? item.completed_gap : item.completed_dict
                                }
                            )
                        } >
                            <Title>{item.completed_dict ? 'OK' : `${++index}`}</Title>
                        </Button>
                    </View>)}
                    keyExtractor={item => item._id}
                    numColumns={3}
                />
            </StyleProvider>
        );
    }
}

export default TalkDictList;