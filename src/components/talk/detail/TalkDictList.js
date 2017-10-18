import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList, ActivityIndicator, Button, Alert } from "react-native";

import { CardSection, Thumbnail } from '../../common';

class TalkDictList extends Component {

    componentWillMount() {
        console.log(this.props.talk);
    }

    componentDidMount() {
        Actions.refresh({ title: this.props.talk.name });
    }

    render() {
        return (
            <FlatList style={{ flex: 1 }}
                data={this.props.talk.script.sens}
                renderItem={({ item, index }) => (<View style={{ flex: 1 }}>
                        <CardSection>
                            <Button title={`${++index}`} onPress={() => 
                            Actions.talkDictItem({ 
                                sen: item,
                                index: index,
                                total: this.props.talk.script.sens.length,
                                media: this.props.talk.media
                             })} />
                        </CardSection>
                    </View>)}
                keyExtractor={item => item._id}
                numColumns={3}
            />
        );
    }
}

export default TalkDictList;