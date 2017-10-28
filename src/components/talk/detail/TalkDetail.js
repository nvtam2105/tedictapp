import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { scriptFetch } from '../../../actions';
import store from '../../../stores';
import moment from 'moment';
import async from 'async';

import RNFetchBlob from 'react-native-fetch-blob';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableWithoutFeedback, ActivityIndicator } from "react-native";

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';

import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Subtitle, Tile, Title, Overlay, Icon, Button
} from '@shoutem/ui';

class TalkDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentWillMount() {
        console.log(this.props.talk);
        console.log(this.props.persisted);
    }

    componentDidMount() {
        //Actions.refresh({ title: this.props.talk.name });
        if (!this.props.persisted && this.props.talk.has_sub) {
            this.props.scriptFetch(this.props.talk.id);
        }
    }

    _downloadImage = (_this, callback) => {
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'jpg'
        }).fetch('GET', _this.props.talk.image, {

        }).progress((received, total) => {
        }).then((res) => {
            callback(null, res.path());
        }).catch((err) => {
            console.log(err);
            callback(null, err);
        });
    }

    _downloadVideo = (_this, callback) => {
        _this.setState({ loading: true })
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp4'
        }).fetch('GET', _this.props.talk.media, {

        }).progress((received, total) => {
            _this.setState({ progress: received / total });
        }).then((res) => {
            _this.setState({ loading: false })
            callback(null, res.path());

        }).catch((err) => {
            console.log(err);
            callback(null, err);
        });
    }

    onPressPratice = (_this, _store) => {
        async.parallel({
            imagePath: this._downloadImage.bind(null, _this),
            mediaPath: this._downloadVideo.bind(null, _this),
        }, function (err, result) {
            //console.log(result.imagePath, result.videoPath);
            _this.props.talk.image = result.imagePath;
            _this.props.talk.media = result.mediaPath;
            _store.saveTalk(_this.props.talk, _this.props.script);
        })

    }

    onPressFillGap() {
        let talk = store.getTalkById(this.props.talk.id);
        Actions.talkDictList({ talk: talk });

    }

    onPressPlay() {
        Actions.talkVideo({ talk: this.props.talk });
    }

    onPressScript() {
        Actions.talkScript({ talk: this.props.talk, persisted: this.props.persisted });
    }

    render() {
        const { talk } = this.props;
        return (
            <StyleProvider style={defaultTheme()}>
                <Screen>
                    <ScrollView>
                        <Image
                            styleName="large-banner"
                            source={{ uri: this.props.persisted ? 'file://' + talk.image : talk.image }} >
                            <Overlay styleName="rounded-small">
                                <Icon name="play" />
                            </Overlay>
                            <View style={styles.speakerOverlay}>
                                <Subtitle style={{ color: 'white' }}>{talk.speaker}</Subtitle>
                            </View>
                            <View style={styles.talkNameOverlay}>
                                <Title style={{ color: 'white', fontWeight: '500' }} numberOfLines={2}>{talk.name}</Title>
                            </View>
                        </Image>


                        <Screen styleName="paper">

                            <Row styleName="small">
                                <Caption>{moment(talk.published_at).fromNow()}</Caption>
                                <Caption>{talk.length > 0 && (moment.utc(talk.length).format("mm[m]"))}</Caption>
                                <Caption>#{talk.tag}</Caption>
                            </Row>
                            <View styleName="horizontal space-between" style={{ paddingHorizontal: 10 }}>
                                {!this.props.script && (
                                    <Button styleName="full-width" style={{ borderRadius: 5 }}>
                                        <Text>NO DICTATION AVALABLE</Text>
                                    </Button>
                                )
                                }
                                {!this.state.loading && this.props.script && (
                                    <Button styleName="secondary" style={{ borderRadius: 5 }}
                                        onPress={this.onPressPratice.bind(null, this, store)}>
                                        <Text>DICTATION</Text>
                                    </Button>
                                )
                                }
                                {this.state.loading && this.props.script && (
                                    <View>
                                        <ProgressBar
                                            width={150}
                                            progress={this.state.progress}
                                        />
                                        {/* <ActivityIndicator style={{ flex: 1 }}
                                            animating={this.state.loading}
                                            size="small" /> */}
                                    </View>)
                                }


                                <Button styleName="secondary" style={{ borderRadius: 5 }}
                                    onPress={this.onPressFillGap.bind(this)}>
                                    <Text>FILL GAP</Text>
                                </Button>
                                <Button styleName="secondary" style={{ borderRadius: 5 }}
                                    onPress={this.onPressPlay.bind(this)}>
                                    <Text>PLAY</Text>
                                </Button>

                            </View>
                            <View styleName="horizontal stretch space-between" style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Button styleName="secondary" style={{ borderRadius: 5 }}
                                    kind='squared'
                                    onPress={this.onPressScript.bind(this)}>
                                    <Text>SCRIPT</Text>
                                </Button>
                            </View>
                            <Text styleName="md-gutter multiline">{talk.description}</Text>
                        </Screen>
                    </ScrollView>
                </Screen>
            </StyleProvider>
        );
    }
}

const styles = {
    talkNameOverlay: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 5,
    },

    speakerOverlay: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        left: 0,
        padding: 5,

    },
}

const mapStateToProps = state => {
    return { script: state.script };
};

const mapDispatchToProps = { scriptFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail);
