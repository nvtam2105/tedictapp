import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { StyleSheet, Platform, Keyboard, Alert, Slider, KeyboardAvoidingView } from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Subtitle, Tile, Title, Overlay, Icon, Button, TextInput, TouchableOpacity
} from '@shoutem/ui';


import { CardSection, Thumbnail, VideoPlayer } from '../../common';

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Video from 'react-native-video'; // eslint-disable-line

class TalkDictItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: this.props.sen.content,
            hiddenContent: this.props.sen.content.replace(/[a-zA-Z]/g, '*'),

            isPlaying: true,
            isReplay: false,
            rate: 1.0,

        }

        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onPlayPress = this.onPlayPress.bind(this);

    }

    componentWillMount() {
        this.setState({
            currentIndex: this.state.hiddenContent.indexOf("*"),
        });

    }

    componentDidMount() {
        Actions.refresh({ title: `# ${this.props.index}/${this.props.total}` });
    }

    componentWillUnmount() {
    }

    onPlayPress() {
        if (this.state.isReplay) {
            this.player.seek(this.props.sen.start / 1000);
        }
        this.setState({
            isPlaying: !this.state.isPlaying,
            isReplay: false,
        });
    }

    onLoad(obj) {
        this.player.seek(this.props.sen.start / 1000);

    }

    onProgress(obj) {
        if (obj.currentTime > this.props.sen.end / 1000) {
            this.setState({
                isPlaying: false,
                isReplay: true,
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
        const { currentIndex, rate, isPlaying } = this.state;
        return (
            <StyleProvider style={defaultTheme()}>
                <KeyboardAwareScrollView enableOnAndroid={Platform.OS === 'android'}>
                    <Screen>
                        <TextInput
                            ref={(ref) => this.textInput = ref}
                            style={{ height: 100 }}
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

                        <Row>
                            <View>
                                <TouchableOpacity onPress={this.onPlayPress.bind(this)}>
                                    <Video
                                        style={{
                                            height: 200
                                        }}
                                        ref={p => { this.player = p; }}
                                        paused={!this.state.isPlaying}
                                        onProgress={this.onProgress.bind(this)}
                                        onLoad={this.onLoad.bind(this)}
                                        source={{ uri: 'file://' + this.props.media }}
                                        resizeMode={'cover'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Row>
                        <Row>
                            <View styleName="horizontal space-between">
                                <Slider
                                    style={{ width: 50 }}
                                    //step={1}
                                    onValueChange={(value) => Alert.alert(value)} />

                                <Octicons name="triangle-down" size={30} />
                                <Text>x1.0</Text>
                                <Octicons name="triangle-up" size={30} />
                                <Button onPress={this.onPlayPress.bind(this)}>
                                    <MaterialIcons name={this.state.isReplay ? 'replay' :(this.state.isPlaying ? 'pause' : 'play-arrow')} size={30} />
                                </Button>
                            </View>
                        </Row>


                    </Screen>
                </KeyboardAwareScrollView>
            </StyleProvider>
        );
    }
}


export default TalkDictItem;
