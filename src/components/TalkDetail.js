import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button, TouchableWithoutFeedback,ActivityIndicator } from "react-native";
import { Actions } from 'react-native-router-flux';

import VideoPlayer from 'react-native-video-controls';

import RNFetchBlob from 'react-native-fetch-blob';


class TalkDetail extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            loading: false
        }
    }
    

    onPressPraticeFull() {
        //Actions.talkVideo({ talk: this.props.talk });
        this.setState({
            loading: true
        })
        //this.state.loading = true;
        RNFetchBlob
        .config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache : true,
        })
        .fetch('GET', this.props.talk.medias[0].url, {
          //some headers ..
          name: this.props.talk.id + '.mp4',
          filename: this.props.talk.id + 'mp4',
          type: 'video/mp4',
        })
        .then((res) => {
          // the temp file path
          this.setState({
            loading: false
        })
          console.log('The file saved to ', res.path());
        })
      
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
                <ImageBackground style={stretch} source={{uri: this.props.talk.images[2].url}} >
                    <TouchableWithoutFeedback onPress={this.onPressPlay.bind(this)}>
                        <Image style={stretch} source={require('../../assets/images/play_bt.png')} />
                    </TouchableWithoutFeedback>
                    
                </ImageBackground>
                
               
                <Text>{this.props.talk.description}</Text>
                
                <Button
                    onPress={this.onPressPraticeFull.bind(this)}
                    title="PRACTICE HARD"
                    accessibilityLabel="Learn more about this purple button"
                />
                <ActivityIndicator 
                        animating={this.state.loading}
                        size="small" />

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

