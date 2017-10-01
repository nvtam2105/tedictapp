import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import VideoPlayer from 'react-native-video-controls';

class TalkVideo extends Component {

    componentWillMount() {
        console.log(this.props.talk);
    }

    render() {
        return (
            <VideoPlayer
            paused={false}
            source={{ uri: this.props.talk.medias[3].url }}
            navigator={ this.props.navigator }
            rate={1.0}
            />
        );
    }
}

export default TalkVideo;