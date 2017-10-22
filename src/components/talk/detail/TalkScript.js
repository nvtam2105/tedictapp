import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList } from "react-native";
import { View, Row, Caption, Text, Subtitle, Tile, Title, Overlay, Icon, Button, Divider } from '@shoutem/ui';
import { connect } from 'react-redux';

import { scriptFetch } from '../../../actions';


class TalkScript extends Component {

    componentWillMount() {
        console.log(this.props.talk);
        // Check exist in local storage??
        this.props.scriptFetch(this.props.talk.id);

    }

    componentDidMount() {
        Actions.refresh({ title: this.props.talk.name });
    }

    renderSeparator = () => {
        return (
            <Divider styleName="line" />
        );
    };

    render() {
        return (
            <FlatList style={{ flex: 1 }}
                data={this.props.script.sens}
                renderItem={({ item, index }) => (
                    <Row>

                        <View styleName="vertical">
                            <View styleName="horizontal space-between">
                                <Text>{index + 1}</Text>
                            </View>
                            <Text styleName="multiline">{item.content}</Text>
                        </View>
                        <Icon styleName="disclosure" name="right-arrow" />
                    </Row>


                )}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return { script: state.script };
};

const mapDispatchToProps = { scriptFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkScript);
