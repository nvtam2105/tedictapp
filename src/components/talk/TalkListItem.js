import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Row, Caption, Image, Subtitle } from '@shoutem/ui';
import moment from 'moment';

class TalkListItem extends Component {

    onRowPress() {
        Actions.talkDetail({ talk: this.props.talk });
    }
    render() {
        const { talk } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <Row>
                    <Image
                        styleName="medium rounded-corners"
                        source={{ uri: talk.image }} />
                    <View styleName="vertical stretch space-between">
                        <Subtitle>{talk.name}</Subtitle>
                        <View styleName="horizontal space-between">
                            <Caption>{moment(talk.published_at).fromNow()}</Caption>
                            <Caption>{talk.length > 0 && (moment.utc(talk.length).format("mm[m]"))}</Caption>
                        </View>
                    </View>
                </Row>
            </TouchableWithoutFeedback>
        );
    }
}

export default TalkListItem;