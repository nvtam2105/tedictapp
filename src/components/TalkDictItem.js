import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TextInput, Button, Alert } from "react-native";

import { CardSection, Thumbnail } from './common';

import VideoPlayer from 'react-native-video-controls';

class TalkDictItem extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     player: false,

        // };
    }

    componentWillMount() {
        console.log('componentWillMount=' + this.props.sen);
        console.log(this.props.sen);
    }

    componentDidMount() {
        Actions.refresh({ title: `# ${this.props.index}/${this.props.total}` });
    }

    onPressPlay(obj) {
        console.log('onPressPlay' + obj);

        //this.player.setState({ paused: false });
        console.log(this.player);
        this.player.setState({
            //seek: this.props.sen.startTime / 1000,
            paused: false

        });
        // this.player.setStatesetSeekerPosition(this.props.sen.startTime/1000);
    }


    _loadStart(obj) {
        console.log('_loadStart'  + obj);
        console.log(obj);
    }

    _setTime(obj) {
        console.log('_setTime = ' + obj);
        console.log(obj);
    }

    _onValueChange(obj) {
        console.log('_onValueChange' + obj);
        console.log(obj);
    }

    _onLoad(obj) {
        console.log('_onLoad' + obj);
        console.log(obj);
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
                <View style={{ flex: 0.5 }}>
                    <VideoPlayer
                        ref={(ref) => {
                            this.player = ref
                        }}
                        //currentTime={this.props.sen.startTime / 1000}
                        //duration={(this.props.sen.startTime + this.props.sen.duration)/1000}
                        //onLoad={this.onLoad}
                        //onProgress={this.onProgress}
                        //onEnd={this.onEnd}
                        onLoadStart={this._loadStart.bind(this)} // Callback when video starts to load
                        onLoad={this._onLoad.bind(this)}    // Callback when video loads
                        onProgress={this._setTime.bind(this)}    // Callback every ~250ms with currentTi

                        paused={true}
                        source={{ uri: this.props.media }}
                        navigator={this.props.navigator}
                        rate={1.0}
                    />
                </View>
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