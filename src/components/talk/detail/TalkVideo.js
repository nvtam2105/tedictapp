import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { CardSection, Thumbnail, VideoPlayer } from '../../common';

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';


class TalkVideo extends Component {

    componentWillMount() {
        console.log(this.props.talk);
    }

    render() {
        return (
            <VideoPlayer
                video={{ uri: this.props.talk.media }}
                autoplay
            />
        );
    }
}

export default TalkVideo;