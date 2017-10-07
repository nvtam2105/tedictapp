import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, TextInput, Button, Alert } from "react-native";

import { CardSection, Thumbnail, VideoPlayer } from './common';

class TalkDictItem extends Component {

    constructor(props) {
        super(props);
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
        
        
    }


    onLoad(obj) {
        console.log('_loadStart'  + obj);
        console.log(obj);
        console.log(this.player);
        this.player.seek(this.props.sen.startTime/1000);
        
    }

    _setTime(obj) {
        console.log('_setTime = ' + obj);
        console.log(obj);
        console.log(this.player);
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
                        autoplay
                        onLoad={this.onLoad.bind(this)}
                        video={{ uri: this.props.media }}
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