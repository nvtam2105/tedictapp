import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {  Keyboard, Alert } from "react-native";

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

        this.onChangeText = this.onChangeText.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount=' + this.props);
        console.log(this.props);
      


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
        console.log(obj);
        //console.log(obj);
        //console.log(this.player);
        // if ((obj.currentTime - this.props.sen.startTime/1000) >= this.props.sen.duration/1000) {
        //     this.player.setState({
        //         isPlaying: !this.player.state.isPlaying,
        //     });
        // }
        if (obj.currentTime >= this.props.sen.end / 1000) {
            this.player.setState({
                isPlaying: !this.player.state.isPlaying,
            });
            this.setState({
                playing: false
            });

        }
    }

    onChangeText(text) {
        Alert.alert(text);
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
                    //numberOfLines={10}
                    textAlign="left"
                    style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={ (text) => {this.onChangeText(text)} }
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
