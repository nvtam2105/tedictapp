import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {

    render() {
        console.log(this.props);
        return (
            <CardSection>
                <Text>{this.props.talk.name}</Text>
            </CardSection>
        );
    }

}


export default ListItem;