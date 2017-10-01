import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableWithoutFeedback } from "react-native";
import { Actions } from 'react-native-router-flux';

import VideoPlayer from 'react-native-video-controls';


class TalkDetail extends Component {

    onPressPraticeFull() {
        //Actions.talkVideo({ talk: this.props.talk });
    }
    
    onPressFillGap() {
        Actions.talkVideo({ talk: this.props.talk });
    }


    onPressPlay() {
        Actions.talkVideo({ talk: this.props.talk });
    }

    onPressScript() {
        Actions.talkScript({ talk: this.props.talk });
    }


    componentWillMount() {
    }

    render() {
        const { stretch } = styles;
        return (
            <View style={{flex:1}}>
                <Image style={stretch} source={{uri: this.props.talk.images[2].url}} >
                    <TouchableWithoutFeedback onPress={this.onPressPlay.bind(this)}>
                        <Image style={stretch} source={require('../../assets/images/play_bt.png')} />
                    </TouchableWithoutFeedback>
                </Image>
                <Text>{this.props.talk.description}</Text>
                
                <Button
                    onPress={this.onPressPraticeFull.bind(this)}
                    title="PRACTICE HARD"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={this.onPressFillGap.bind(this)}
                    title="FILL GAP"
                    accessibilityLabel="Learn more about this purple button"
                />

                <Button
                    onPress={this.onPressPlay.bind(this)}
                    title="PLAY VIDEO"
                    accessibilityLabel="Learn more about this purple button"
                />

                <Button
                    onPress={this.onPressScript.bind(this)}
                    title="Script"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}

const styles = {
    stretch: {
      width: 100,
      height: 100
    }
};

export default TalkDetail;

