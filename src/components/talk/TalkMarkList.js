import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Actions } from 'react-native-router-flux';

import store from '../../stores';
import TalkMarkItem from './TalkMarkItem';


class TalkMarkList extends Component {

  componentWillMount() {
    this.setState({
      talks: store.getTalks(),
    });
  }

  onDeleteTalk(talk) {
    store.deleteTalk(talk);
    this.setState({
      talks: store.getTalks(),
    });
  }

  _scroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  }

  _renderItem(talk) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.onDeleteTalk(talk) }
    }];

    return (<TalkMarkItem talk={talk} swipeBtns={swipeBtns} scroll={this._scroll.bind(this)} persisted={true} />)
  }

  render() {


    return (
      <FlatList
        scrollEnabled={this.state.scrollEnabled}
        data={this.state.talks}
        renderItem={({ item }) => this._renderItem(item)}
        keyExtractor={item => item.id}
      />
    );
  }
}

export default TalkMarkList;
