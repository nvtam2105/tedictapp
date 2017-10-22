import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { View, Row, Caption, Image, Subtitle, Title, Icon, Heading } from '@shoutem/ui';
import moment from 'moment';

class TalkListItem extends Component {

    onRowPress() {
        Actions.talkDetail({ talk: this.props.talk });
    }
    render() {
        const { talk } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <Row style={{ paddingHorizontal: 5, paddingVertical: 2.5 }}>
                    <Image
                        styleName="medium"
                        source={{ uri: talk.image }} />
                    <View styleName="vertical stretch space-between">
                        <Caption>{_.toUpper(talk.tag)} </Caption>
                        <Subtitle styleName="top" numberOfLines={2}>{talk.name}</Subtitle>
                        <View styleName="horizontal space-between">
                            <Caption>{moment(talk.published_at).fromNow()}</Caption>
                            <Caption>{talk.length > 0 && (moment.utc(talk.length).format("mm[m]"))}</Caption>
                        </View>
                    </View>
                    <Icon styleName="disclosure" name="right-arrow" />
                </Row>
            </TouchableWithoutFeedback>
        );
    }
}

export default TalkListItem;