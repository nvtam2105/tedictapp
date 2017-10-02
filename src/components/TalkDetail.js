import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button, TouchableWithoutFeedback,ActivityIndicator } from "react-native";
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-controls';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from 'react-native-progress/Bar';

import store from '../stores';

class TalkDetail extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            loading: false
        }
    }
    
    onPressPratice() {
        this.setState({ loading: true })
        RNFetchBlob.config({
          fileCache : true,
        }).fetch('GET', this.props.talk.medias[0].url, {
          name: this.props.talk.id + '.mp4',
          filename: this.props.talk.id + 'mp4',
          type: 'video/mp4',
        }).progress((received, total) => {
            this.setState({ progress: received / total});
        }).then((res) => {
          this.setState({ loading: false })
          console.log('The file saved to ', res.path());
        }).catch((err) => {
         console.log(err);
        });
    }
    
    onPressFillGap() {
        //Actions.talkVideo({ talk: this.props.talk });
        console.log(store);
        console.log(store.createTodoItem(this.props.talk.name));
        var results = store.getTodoItems();
        console.log(results);
        for (var i in results) {
            console.log(results[i]);
        }
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
                
                {   !this.state.loading && (
                        <Button
                        onPress={this.onPressPratice.bind(this)}
                        title="PRACTICE HARD"
                        accessibilityLabel="Learn more about this purple button"
                        />
                        )
                }
                {   this.state.loading && (
                        <View>
                            <ProgressBar
                                width={150} 
                                progress={this.state.progress}
                            />
                            <ActivityIndicator style={{flex:1}}
                                    animating={this.state.loading}
                                    size="small" />
                        </View>)
                }    
                    
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

