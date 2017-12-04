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
import TalkDictItem from './TalkDictItem';


class TalkDictSwiper extends Component {

    render() {
        return (
            <StyleProvider style={defaultTheme()}>
                <Swiper loop={false} index={this.props.selectedIndex}
                    loadMinimal loadMinimalSize={0}
                    showsButtons={false} showsPagination={false} autoplay={false}>
                    {this.props.talk.script.sens.map((item, key) => {
                        //console.log('TalkDictSwiper-selectedIndex=' + this.props.selectedIndex);
                        //console.log('TalkDictSwiper-key=' + key);
                        return (
                            <TalkDictItem
                                isFillGap={this.props.isFillGap}
                                sen={item}
                                key={key}
                                index={key}
                                total={this.props.talk.script.sens.length}
                                media={this.props.talk.media} />)
                        })
                    }
                </Swiper>
            </StyleProvider>
        );
    }
}

export default TalkDictSwiper;