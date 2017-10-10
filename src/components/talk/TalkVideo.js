import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { CardSection, Thumbnail, VideoPlayer } from '../common';

class TalkVideo extends Component {

    componentWillMount() {
        console.log(this.props.talk);
    }

    render() {
        return (
            <VideoPlayer
                video={{ uri: this.props.talk.medias[0].url }}
                autoplay
            />
        );
    }
}

export default TalkVideo;