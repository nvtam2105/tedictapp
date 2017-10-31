import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Platform, Keyboard, Alert } from "react-native";

import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Subtitle, Tile, Title, Overlay, Icon, Button, TextInput
} from '@shoutem/ui';


import { CardSection, Thumbnail, VideoPlayer } from '../../common';

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';


class TalkDictItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: true,
            content: this.props.sen.content,
            hiddenContent: this.props.sen.content.replace(/[a-zA-Z]/g, '*'),
            rate: 1.0
        }

        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentWillMount() {
        //console.log('componentWillMount=' + this.props);
        //console.log(this.props);
        this.setState({
            currentIndex: this.state.hiddenContent.indexOf("*"),
        });

    }

    componentDidMount() {
        Actions.refresh({ title: `# ${this.props.index}/${this.props.total}` });
    }

    componentWillUnmount() {
    }

    onPressPlay(obj) {
        console.log('onPressPlay' + obj);
        this.setState({
            playing: !this.state.playing,
        });
    }


    onLoad(obj) {
        this.player.seek(this.props.sen.start / 1000);
    }

    onProgress(obj) {
        if (obj.currentTime >= this.props.sen.end / 1000) {
            this.player.setState({
                isPlaying: !this.player.state.isPlaying,
            });
            this.setState({
                playing: false
            });

        }
    }

    onKeyPress(e) {
        if (Platform.OS === 'ios') {
            const { content, hiddenContent, currentIndex } = this.state;
            if (typeof content[currentIndex] !== 'undefined'
                && e.nativeEvent.key.toLowerCase() === content[currentIndex].toLowerCase()) {
                this.setState({
                    hiddenContent: hiddenContent.substr(0, currentIndex) + content[currentIndex]
                    + hiddenContent.substr(currentIndex + content[currentIndex].length),
                }, () => {
                    this.setState({
                        currentIndex: this.state.hiddenContent.indexOf("*") === -1 ? 0 : this.state.hiddenContent.indexOf("*"),
                    });
                });
            }
        }
    }

    onChangeText(text) {
        if (Platform.OS === 'android') {
            //replace(/[^a-zA-Z]/g, ''),
            const { content, hiddenContent, currentIndex } = this.state;
            text = text.replace(/[^a-zA-Z]/g, '');
            let charCode = text.charAt(text.length - 1);
            if (typeof content[currentIndex] !== 'undefined'
                && charCode === content[currentIndex].toLowerCase()) {
                this.setState({
                    hiddenContent: hiddenContent.substr(0, currentIndex) + content[currentIndex]
                    + hiddenContent.substr(currentIndex + content[currentIndex].length),
                }, () => {
                    this.setState({
                        currentIndex: this.state.hiddenContent.indexOf("*") === -1 ? 0 : this.state.hiddenContent.indexOf("*"),
                    });
                });
            }
        }
    }

    render() {
        const { currentIndex, rate, playing } = this.state;
        return (
            <StyleProvider style={defaultTheme()}>
                <Screen>
                    <TextInput
                        value={this.state.hiddenContent}
                        autoFocus={true}
                        multiline={true}
                        selectionColor={'transparent'}
                        caretHidden={true}
                        underlineColorAndroid={'transparent'}
                        selection={{ start: currentIndex, end: currentIndex }}
                        onKeyPress={this.onKeyPress}
                        onChangeText={this.onChangeText.bind(this)}
                    />

                    {playing && (
                        <View style={{ flex: 1 }}>
                            <VideoPlayer
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                autoplay
                                onLoad={this.onLoad.bind(this)}
                                onProgress={this.onProgress.bind(this)}
                                video={{ uri: 'file://' + this.props.media }}
                                rate={rate} />
                        </View>
                    )}
                    <Button onPress={this.onPressPlay.bind(this)}>
                        <Text>PLAY VIDEO</Text>
                    </Button>
                </Screen>
            </StyleProvider>
        );
    }
}

export default TalkDictItem;
