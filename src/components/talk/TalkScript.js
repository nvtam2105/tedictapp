import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, FlatList } from "react-native";
import { connect } from 'react-redux';

import { scriptFetch } from '../../actions';


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
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    render() {
        return (
            <FlatList style={{ flex: 1 }}
                data={this.props.script.sens}
                renderItem={({ item, index }) => (
                    <View style={{ flex: 1 }}>
                        <Text>{index + 1}</Text>
                        <Text>{item.content}</Text>
                    </View>
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
