import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection, Thumbnail } from './common';

class ListItem extends Component {

    render() {
        return (
            <CardSection>
                <Thumbnail source={this.props.talk.image_16x9}/>
                <Text style={styles.titleStyle}>
                    {this.props.talk.id}  {this.props.talk.name}
                </Text>
            </CardSection>
        );
    }
}

const styles = {
    titleStyle: {
      fontSize: 18,
      paddingLeft: 15
    }
};

export default ListItem;