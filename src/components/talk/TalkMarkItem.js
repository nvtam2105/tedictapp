import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Row, Caption, Image, Subtitle, Title, Icon, Heading, Text } from '@shoutem/ui';
import { StyleProvider } from '@shoutem/theme';

import defaultTheme from '../../themes';
import moment from 'moment';
import store from '../../stores';

import Swipeout from 'react-native-swipeout';

class TalkMarkItem extends Component {


    componentWillMount() {

    }

    componentDidMount() {

    }

  
    onRowPress() {
        if (this.props.persisted) {
            Actions.talkDetail({ talk: this.props.talk, persisted: true });
        } else {
            let talk = store.getTalkById(this.props.talk.id);
            typeof talk === "undefined" ? Actions.talkDetail({ talk: this.props.talk, persisted: false })
                : Actions.talkDetail({ talk: talk, persisted: true });
        }
    }

    render() {
        const { talk } = this.props;
        return (
            <Swipeout right={this.props.swipeBtns}
                scroll={this.props.scroll}
                autoClose={true}
                backgroundColor='transparent'>
                <StyleProvider style={defaultTheme()}>
                    <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                        <Row style={{ paddingHorizontal: 5, paddingVertical: 2.5 }}>
                            <Image
                                styleName="medium"
                                source={{ uri: this.props.persisted ? 'file://' + talk.image : talk.image }} />
                            <View styleName="vertical space-between">
                                <Caption>{_.toUpper(talk.tag)} </Caption>
                                <Subtitle styleName="top" numberOfLines={2}>{talk.name}</Subtitle>
                                <View styleName="horizontal space-between">
                                    <Caption>{moment(talk.published_at).fromNow()}</Caption>
                                    <Caption>{talk.length > 0 && (moment.utc(talk.length).format("mm [min]"))}</Caption>
                                </View>
                            </View>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </TouchableWithoutFeedback>
                </StyleProvider>
            </Swipeout>
        );
    }
}

export default TalkMarkItem;