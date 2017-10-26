import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Actions } from 'react-native-router-flux';

import store from '../../stores';
import TalkItem from './TalkItem';


class TalkMarkList extends Component {

  componentWillMount() {
    this.setState({
      talks: store.getTalks(),
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.talks}
        renderItem={({ item }) => (<TalkItem talk={item} persisted={true} />)}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default TalkMarkList;
