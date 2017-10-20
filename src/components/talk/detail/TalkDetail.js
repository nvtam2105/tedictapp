import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { scriptFetch } from '../../../actions';
import store from '../../../stores';
import moment from 'moment';

import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { CardSection, Thumbnail, VideoPlayer } from '../../common';
import { ScrollView, Screen, Image, Divider, View, Row, Caption, Text, Subtitle, Tile, Title, Overlay, Icon, Button } from '@shoutem/ui';

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

        // // Download Video
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


        // Download Image and Video
        // RNFetchBlob.config({
        //     fileCache: true,
        //     appendExt: 'jpg'
        // }).fetch('GET', this.props.talk.image, {

        // }).progress((received, total) => {
        //     this.setState({ progress: received / total });
        // }).then((res) => {
        //     this.setState({ loading: false })
        //     console.log('The file image saved to ', res.path());
        //     this.props.talk.image = res.path();
        //     store.saveTalk(this.props.talk, this.props.script);

        // }).catch((err) => {
        //     console.log(err);
        // });
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
        const { talk } = this.props;
        return (
            <Screen>
                <Image
                    //styleName="large-portrait hero"
                    //animationName="hero"
                    styleName="large-banner hero"
                    source={{ uri: talk.image }}>
                    <Tile styleName="sm-gutter-horizontal">
                        <Overlay styleName="rounded-small">
                            <Icon name="play" />
                        </Overlay>
                        {/* <Tile animationName="hero"> */}
                        <Subtitle>Content courtesy of TED.com</Subtitle>
                        {/* </Tile> */}
                    </Tile>
                </Image>
                <ScrollView>
                    <Screen styleName="paper">
                        <Subtitle styleName="md-gutter multiline">{talk.name}</Subtitle>
                        <Divider styleName="line" />
                        <Row>
                            <Caption>{moment(talk.published_at).fromNow()}</Caption>
                            <Caption>{talk.length > 0 && (moment.utc(talk.length).format("mm[m]"))}</Caption>
                            <Caption>{talk.speaker}</Caption>
                            <Caption>#{talk.tag}</Caption>
                        </Row>
                        <Divider styleName="line" />
                        <View styleName="horizontal">
                            {!this.props.script && (
                                <Button styleName="full-width">
                                    <Text>NO DICTATION AVALABLE</Text>
                                </Button>
                            )
                            }
                            {!this.state.loading && this.props.script && (
                                <Button styleName="dark full-width"
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


                            <Button styleName="dark full-width"
                                onPress={this.onPressFillGap.bind(this)}>
                                <Text>FILL GAP</Text>
                            </Button>
                            <Button styleName="dark full-width"
                                onPress={this.onPressPlay.bind(this)}>
                                <Text>PLAY</Text>
                            </Button>

                        </View>
                        <View styleName="horizontal">
                            <Button styleName="dark full-width"
                                onPress={this.onPressScript.bind(this)}>
                                <Text>SCRIPT</Text>
                            </Button>
                        </View>
                        <Divider styleName="line" />
                        <Text styleName="md-gutter multiline">{talk.description}</Text>
                    </Screen>
                </ScrollView>
            </Screen>

        );
    }
}

const mapStateToProps = state => {
    return { script: state.script };
};

const mapDispatchToProps = { scriptFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail);
