import React, { Component } from 'react';
import { Text, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Thumbnail } from '../common';
import { Card } from '@shoutem/ui';

class TalkListItem extends Component {

    onRowPress() {
        Actions.talkDetail({ talk: this.props.talk });
    }


    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <Card>
                <View style={{ flex: 1 }}>
                    
                        <Thumbnail source={this.props.talk.image_16x9 || this.props.talk.images[0].url} />
                        <Text style={styles.titleStyle}>
                            {this.props.talk.name}
                        </Text>
                    
                </View>
                </Card>
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