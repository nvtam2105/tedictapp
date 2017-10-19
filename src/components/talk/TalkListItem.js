import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Thumbnail } from '../common';
import { View, Row, Caption, Image, Text, Subtitle, Tile, Title, Overlay, Icon } from '@shoutem/ui';
import moment  from 'moment';

class TalkListItem extends Component {

    onRowPress() {
        Actions.talkDetail({ talk: this.props.talk });
        console.log(this.props.talk);
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
                            {/* <Caption>{talk.speaker}</Caption> */}
                            
                            <Caption>{moment.utc(talk.length).format("mm[m] ss[s]")}</Caption>
                            <Caption>#{talk.tag}</Caption>
                            {/* <Caption>{talk.viewed_count}K</Caption> */}
                        </View>
                    </View>
                </Row>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        flex: 1,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15
    }
};

export default TalkListItem;