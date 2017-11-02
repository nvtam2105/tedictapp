import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Platform, Keyboard, Alert, Slider, KeyboardAvoidingView } from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Subtitle, Tile, Title, Overlay, Icon, Button, TextInput
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
        this.onPressPlay = this.onPressPlay.bind(this);
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

    onPressPlay() {
        console.log('onPressPlay');
        this.setState({
            playing: !this.state.playing,
        });
        this.player.setState({
            isPlaying: this.state.playing,
        });
        //this.player.onPlayPress();
    }


    onLoad(obj) {
        this.player.seek(this.props.sen.start / 1000);
    }

    onProgress(obj) {
        if (obj.currentTime >= this.props.sen.end / 1000) {
            this.player.setState({
                isPlaying: !this.player.state.isPlaying,
            });
            this.player.onPlayPress();

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
                <KeyboardAwareScrollView enableOnAndroid={Platform.OS === 'android'}>
                    <Screen>

                        
                            <Row>
                                <View style={{ flex: 1 }}>
                                    <VideoPlayer
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        pauseOnPress={true}
                                        endWithThumbnail
                                        autoplay
                                        onLoad={this.onLoad.bind(this)}
                                        onProgress={this.onProgress.bind(this)}
                                        video={{ uri: 'file://' + this.props.media }}
                                        rate={rate} />

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
                                <Button onPress={this.onPressPlay.bind(this)}>
                                    <MaterialIcons name={this.state.playing ? 'pause' : 'play-arrow'} size={30} />
                                </Button>
                            </View>
                        </Row>
                        <TextInput
                            style={{ height: 200 }}
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

                       

                    </Screen>
                </KeyboardAwareScrollView>
            </StyleProvider>
        );
    }
}

export default TalkDictItem;
