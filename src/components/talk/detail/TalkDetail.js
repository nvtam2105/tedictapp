import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { scriptFetch } from '../../../actions';
import store from '../../../stores';
import moment from 'moment';
import async from 'async';
import _ from 'lodash';

import RNFetchBlob from 'react-native-fetch-blob';
//import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';

import { TouchableWithoutFeedback, ActivityIndicator, Alert } from "react-native";

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';

import {
    ScrollView, Screen, Image, Divider, View, Row, Caption, Text,
    Subtitle, Tile, Title, Overlay, Icon, Button
} from '@shoutem/ui';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


class TalkDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            persisted: this.props.persisted,
        }
    }

    componentWillMount() {
        //console.log(this.props.talk);
        //console.log(this.props.persisted);
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

        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp4'
        }).fetch('GET', _this.props.talk.media, {

        }).progress((received, total) => {
            _this.setState({ progress: received / total });
        }).then((res) => {
            //_this.setState({ loading: false })
            callback(null, res.path());

        }).catch((err) => {
            console.log(err);
            callback(null, err);
        });
    }

    onPresMakeDicatation = (_this, _store) => {
        if (_this.props.talk.has_sub) {

            _this.setState({ loading: true })
            async.parallel({
                imagePath: this._downloadImage.bind(null, _this),
                mediaPath: this._downloadVideo.bind(null, _this),
            }, function (err, result) {
                _this.props.talk.image = result.imagePath;
                _this.props.talk.media = result.mediaPath;
                _store.saveTalk(_this.props.talk, _this.props.script);
                _this.setState({
                    loading: false,
                    persisted: true,
                })
            })
        } else {
            Alert.alert("Not available dictation of this talk");
        }

    }

    onPressTedictGap() {
        let talk = store.getTalkById(this.props.talk.id);
        Actions.talkDictList({ talk: talk });

    }

    onPressTedict() {
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
                        <TouchableWithoutFeedback onPress={this.onPressPlay.bind(this)}>
                            <Image
                                styleName="large-banner"
                                source={{ uri: this.state.persisted ? 'file://' + talk.image : talk.image }} >
                                <Overlay styleName="rounded-small">
                                    <Icon name="play" />
                                </Overlay>
                                <View style={styles.tedComOverlay}>
                                    <Subtitle style={{ color: 'white' }}>Content courtesy of TED.com</Subtitle>
                                </View>
                                <View style={styles.speakerOverlay}>
                                    <Subtitle style={{ color: 'white' }}>{talk.speaker} <Caption style={{ color: 'white' }}>at {talk.event}</Caption></Subtitle>
                                </View>
                                <View style={styles.talkNameOverlay}>
                                    <Title style={{ color: 'white', fontWeight: '500' }} numberOfLines={2}>{talk.name}</Title>
                                </View>
                            </Image>
                        </TouchableWithoutFeedback>

                        <Screen styleName="paper">
                            <Row>
                                <View styleName="horizontal stretch space-between">
                                    <View styleName="horizontal" style={{alignItems: 'center', flexDirection: 'row'}}>
                                        <Ionicons name="ios-calendar-outline" size={18} />
                                        <Subtitle style={{ paddingLeft: 8 }}>{moment(talk.published_at).fromNow()}</Subtitle>
                                    </View>
                                    <View styleName="horizontal" style={{alignItems: 'center', flexDirection: 'row'}}>
                                        <Ionicons name="ios-time-outline" size={18} />
                                        <Subtitle style={{ paddingLeft: 8 }}>{talk.length > 0 && (moment.utc(talk.length).format("mm [min]"))}</Subtitle>
                                    </View>
                                    <View styleName="horizontal" style={{alignItems: 'center', flexDirection: 'row'}}>
                                        <Ionicons name="md-pricetag" size={18} />
                                        <Subtitle style={{ paddingLeft: 8 }}>{_.startCase(talk.tag)}</Subtitle>
                                    </View>
                                </View>
                            </Row>
                            
                            <View>
                                {!this.state.persisted && (
                                    <View styleName="horizontal stretch space-between" style={{ padding: 10 }}>
                                        {!this.state.loading && (
                                            <Button styleName="secondary"
                                                onPress={this.onPresMakeDicatation.bind(null, this, store)}>
                                                <Text>MAKE DICTATION</Text>
                                            </Button>
                                        )
                                        }

                                        {this.state.loading && (
                                            <View style={{ alignItems: 'flex-start' }}>
                                                <Progress.Circle
                                                    showsText={true}
                                                    progress={this.state.progress}
                                                />
                                            </View>
                                        )
                                        }

                                        <Button styleName="secondary"
                                            onPress={this.onPressPlay.bind(this)}>
                                            <Text>PLAY ONLINE</Text>
                                        </Button>
                                        <Button styleName="secondary"
                                            onPress={this.onPressScript.bind(this)}>
                                            <Text>SCRIPT</Text>
                                        </Button>
                                    </View>
                                )}

                                {this.state.persisted && (
                                    <View styleName="space-between">
                                        <View styleName="horizontal space-between" style={{ paddingHorizontal: 10 }}>
                                            <Button styleName="secondary"
                                                onPress={this.onPressTedict.bind(this)}>
                                                <Text>TEDICT</Text>
                                            </Button>
                                            <Button styleName="secondary"
                                                onPress={this.onPressTedictGap.bind(this)}>
                                                <Text>TEDICT-Gap</Text>
                                            </Button>
                                            <Button styleName="secondary"
                                                onPress={this.onPressPlay.bind(this)}>
                                                <Text>PLAY VIDEO</Text>
                                            </Button>

                                        </View>
                                        <View styleName="horizontal space-between" style={{ padding: 10 }}>
                                            {/* style={{ flex: 1, padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', }}> */}
                                            <Button styleName="secondary"
                                                onPress={this.onPressScript.bind(this)}>
                                                <Text>SCRIPT</Text>
                                            </Button>
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View styleName="horizontal stretch space-between" style={{ paddingHorizontal: 10, paddingVertical: 5 }}>

                            </View>
                            <Text styleName="md-gutter multiline">{talk.description}</Text>
                        </Screen>
                    </ScrollView>
                </Screen >
            </StyleProvider >
        );
    }
}

const styles = {
    speakerOverlay: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 45,
        left: 0,
        padding: 10,

    },

    talkNameOverlay: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,

        left: 0,
        padding: 10,
    },

    tedComOverlay: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        //padding: 5,
    },


}

const mapStateToProps = state => {
    return { script: state.script };
};

const mapDispatchToProps = { scriptFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkDetail);
