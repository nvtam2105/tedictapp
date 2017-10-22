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
        //Actions.refresh({ title: this.props.talk.name });
        if (this.props.talk.has_sub) {
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
        //let talk = store.getTalkById(this.props.talk.id);
        Actions.talkScript({ talk: this.props.talk });
    }
    render() {
        const { talk } = this.props;
        return (
            <Screen>


                <Image
                    styleName="large-banner hero"
                    source={{ uri: talk.image }}>
                    <Overlay styleName="rounded-small">
                        <Icon name="play" />
                    </Overlay>
                    <View style={styles.speakerOverlay}>
                        <Subtitle style={{color: 'white'}}>{talk.speaker}</Subtitle>
                    </View>
                    <View style={styles.talkNameOverlay}>
                        <Title style={{ color: 'white', fontWeight: '700'}} numberOfLines={2}>{talk.name}</Title>
                    </View>
                </Image>
                <ScrollView>
                    <Screen styleName="paper">

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
                                    onPress={this.onPressPratice.bind(null, this, store)}
                                    accessibilityLabel="Learn more about this purple button">
                                    <Text>Make Dictation</Text>
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

const styles = {
    talkNameOverlay: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
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
