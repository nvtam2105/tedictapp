import _ from 'lodash';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from 'react-native-progress/Bar';

import { connect } from 'react-redux';
import { scriptFetch } from '../../../actions';
import store from '../../../stores';

import { Image, ImageBackground, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { CardSection, Thumbnail, VideoPlayer } from '../../common';





import { View, Row, Caption, Text, Subtitle, Tile, Title, Overlay, Icon, Button } from '@shoutem/ui';

class TalkDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentWillMount() {
        console.log(this.props.talk);
    }

    componentDidMount() {
        Actions.refresh({ title: this.props.talk.name });
        if (this.props.talk.has_sub) {
            this.props.scriptFetch(this.props.talk.id);
        }
    }


    onPressPratice() {
        this.setState({ loading: true })

        // Download Image and Video
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpg'
        }).fetch('GET', this.props.talk.image, {

        }).progress((received, total) => {
            this.setState({ progress: received / total });
        }).then((res) => {
            this.setState({ loading: false })
            console.log('The file image saved to ', res.path());

            this.props.talk.image = res.path();
            // Download Video
            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'mp4'
            }).fetch('GET', this.props.talk.media, {

            }).progress((received, total) => {
                this.setState({ progress: received / total });
            }).then((res) => {
                this.setState({ loading: false })
                console.log('The file video saved to ', res.path());
                this.props.talk.media = res.path();
                store.saveTalk(this.props.talk, this.props.script);
            }).catch((err) => {
                console.log(err);
            });

        }).catch((err) => {
            console.log(err);
        });
    }

    onPressFillGap() {
        let talk = store.getTalkById(this.props.talk.id);
        Actions.talkDictList({ talk: talk });

    }

    onPressPlay() {
        Actions.talkVideo({ talk: this.props.talk });
    }

    onPressScript() {
        Actions.talkScript({ talk: this.props.talk });
    }

    render() {
        const { stretch } = styles;
        const { talk } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={stretch} source={{ uri: talk.image }} >
                    <TouchableWithoutFeedback onPress={this.onPressPlay.bind(this)}>
                        <Image style={stretch} source={require('../../../../assets/img/play_bt.png')} />
                    </TouchableWithoutFeedback>
                </ImageBackground>

                <Text>{talk.description}</Text>


                {!this.props.script && (
                    <Button styleName="dark">
                        <Text>NO DICTATION AVALABLE</Text>
                    </Button>
                )
                }
                {!this.state.loading && this.props.script && (
                    <Button styleName="dark"
                        onPress={this.onPressPratice.bind(this)}
                        accessibilityLabel="Learn more about this purple button">
                        <Text>PRACTICE</Text>
                    </Button>
                )
                }
                {this.state.loading && this.props.script && (
                    <View>
                        <ProgressBar
                            width={150}
                            progress={this.state.progress}
                        />
                        <ActivityIndicator style={{ flex: 1 }}
                            animating={this.state.loading}
                            size="small" />
                    </View>)
                }




                <Button styleName="dark"
                    onPress={this.onPressFillGap.bind(this)}>
                    <Text>FILL GAP</Text>
                </Button>

                <Button styleName="dark"
                    onPress={this.onPressPlay.bind(this)}>
                    <Text>PLAY</Text>
                </Button>

                <Button styleName="dark"
                    onPress={this.onPressScript.bind(this)}>
                    <Text>SCRIPT</Text>
                </Button>
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


const mapStateToProps = state => {
    return { script: state.script };
};

const mapDispatchToProps = { scriptFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail);
