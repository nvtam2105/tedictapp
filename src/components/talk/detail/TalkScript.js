import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList } from "react-native";
import { View, Row, Caption, Text, Subtitle, Tile, Title, Overlay, Icon, Button, Divider } from '@shoutem/ui';
import { connect } from 'react-redux';

import { scriptFetch } from '../../../actions';

import { StyleProvider } from '@shoutem/theme';
import defaultTheme from '../../../themes';



class TalkScript extends Component {

    componentWillMount() {
        if (!this.props.persisted) {
            this.props.scriptFetch(this.props.talk.id);
        }


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
                data={this.props.persisted ? this.props.talk.script.sens : this.props.script.sens}
                renderItem={({ item, index }) => (
                    <StyleProvider style={defaultTheme()}>
                        <Row>
                            <View styleName="vertical">
                                <View styleName="horizontal space-between">
                                    <Text>{index + 1}</Text>
                                </View>
                                <Text styleName="multiline">{item.content}</Text>
                            </View>
                            <Icon styleName="disclosure" name="right-arrow" />
                        </Row>
                    </StyleProvider>
                )}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }
}

const mapStateToProps = state => {
    return { script: state.script };
};

const mapDispatchToProps = { scriptFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkScript);
