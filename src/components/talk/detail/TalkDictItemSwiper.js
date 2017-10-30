import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList, ActivityIndicator, Alert } from "react-native";

import Swiper from 'react-native-swiper';

import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Card, Heading,
    Subtitle, Tile, Title, Overlay, Icon, Button
} from '@shoutem/ui';

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';

import TalkDictItem  from './TalkDictItem';


class TalkDictItemSwiper extends Component {

    componentWillMount() {
        console.log(this.props.talk);
    }

    componentDidMount() {
        Actions.refresh({ title: this.props.talk.name });
    }

    render() {
        return (
            <StyleProvider style={defaultTheme()}>
                <Swiper loop={false} index={0} loadMinimal loadMinimalSize={1} showsButtons={false} showsPagination={false} autoplay={false}>
                    {_.map(this.props.talk.script.sens, (item, index) => {
                        console.log(item);
                        return (
                            <TalkDictItem
                                sen={item}
                                index={index}
                                total={this.props.talk.script.sens.length}
                                media={this.props.talk.media} />
                        )
                    })}
                </Swiper>
            </StyleProvider>
        );
    }
}

export default TalkDictItemSwiper;