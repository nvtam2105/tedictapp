import React, { Component } from 'react';
import { Text, View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Thumbnail } from './common';

class TalkListItem extends Component {

    onRowPress() {
        Actions.talkDetail({ talk: this.props.talk });
    }


    render() {
        return (
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
            <View style={{flex:1}}>
                <CardSection>
                    <Thumbnail source={this.props.talk.images[0].url}/>
                    <Text style={styles.titleStyle}>
                        {this.props.talk.name}
                    </Text>
                </CardSection>
            </View>
        </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
      flex: 1,
      fontSize: 18,
      paddingLeft: 15
    }
};

export default TalkListItem;