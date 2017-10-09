import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TextInput, Button, Alert } from "react-native";

import { CardSection, Thumbnail, VideoPlayer } from './common';

class TalkDictItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: true
        }
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
        this.setState ({
            playing: true,
        });
        
        
        // this.player.setState({
        //     isPlaying: !this.player.state.isPlaying,
        // });
        // this.player.seek(this.props.sen.start / 1000);


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
            this.setState ({
                playing: false
            });

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Text>{this.props.sen.content}</Text> */}
                <TextInput
                    value={this.props.sen.content}
                    //editable={false}
                    multiline={true}
                    numberOfLines={10}
                    style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
                //onChangeText={ (text) => { Alert.alert(text)} }
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
                    title="PLAY VIDEO"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}

export default TalkDictItem;
