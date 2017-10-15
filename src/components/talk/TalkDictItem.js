import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Keyboard, Alert } from "react-native";

import { View, Row, Caption, Text, TextInput, Subtitle, Tile, Title, Overlay, Icon, Button } from '@shoutem/ui';
import { CardSection, Thumbnail, VideoPlayer } from '../common';

class TalkDictItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: true,
            content: this.props.sen.content,
            hiddenContent: this.props.sen.content.replace(/[a-zA-Z]/g, '*')
        }
        //Alert.alert(this.state.hiddenContent);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        //this.onEndEditing = this.onEndEditing.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount=' + this.props);
        console.log(this.props);
        this.setState({
            currentIndex: this.state.hiddenContent.indexOf("*"),
        });

    }

    componentDidMount() {
        Actions.refresh({ title: `# ${this.props.index}/${this.props.total}` });
    }

    onPressPlay(obj) {
        console.log('onPressPlay' + obj);
        this.setState({
            playing: !this.state.playing,
        });
    }


    onLoad(obj) {
        console.log('_loadStart' + obj);
        //console.log(obj);
        // console.log(this.player);
        //console.log(this.props.sen.start / 1000);

        this.player.seek(this.props.sen.start / 1000);

        // this.player.setState({
        //     isPlaying: !this.player.state.isPlaying,
        // });

    }

    onProgress(obj) {
        //console.log(obj);
        if (obj.currentTime >= this.props.sen.end / 1000) {
            this.player.setState({
                isPlaying: !this.player.state.isPlaying,
            });
            this.setState({
                playing: false
            });

        }
    }

    // onChangeText(text) {
    //     //Alert.alert(text);
    //     this.setState({
    //         hiddenContent: text
    //     });

    // }

    handleKeyDown(e) {
        console.log(e.nativeEvent.key);
        const { content, hiddenContent, currentIndex } = this.state;
        if (e.nativeEvent.key.toLowerCase() === content[currentIndex].toLowerCase()) {
            this.setState({
                hiddenContent: hiddenContent.substr(0, currentIndex) + content[currentIndex]
                                + hiddenContent.substr(currentIndex + content[currentIndex].length),
                }, () => {
                    this.setState({
                        currentIndex: this.state.hiddenContent.indexOf("*"),
                    });
                });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Text>{this.props.sen.content}</Text> */}
                <TextInput
                    value={this.state.hiddenContent}
                    
                    //editable={false}
                    multiline={true}
                    autoFocus
                    //selectionColor={'transparent'}
                    selection={{start: this.state.currentIndex, end: this.state.currentIndex}}
                    //numberOfLines={10}
                    //textAlign="left"
                    //style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
                    //onChangeText={(text) => { this.onChangeText(text) }}
                    onKeyPress={this.handleKeyDown}
                //onEndEditing={ (text) => {this.onEndEditing(text)} }
                />
                {this.state.playing && (
                    <View style={{ flex: 0.5 }}>
                        <VideoPlayer
                            ref={(ref) => {
                                this.player = ref
                            }}
                            autoplay
                            onLoad={this.onLoad.bind(this)}
                            onProgress={this.onProgress.bind(this)}
                            video={{ uri: 'file://' + this.props.media }}
                            rate={1.0}
                        />
                    </View>
                )}
                <Button
                    onPress={this.onPressPlay.bind(this)}
                >
                    <Text>PLAY VIDEO</Text>
                </Button>
            </View>
        );
    }
}

export default TalkDictItem;
