import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { talksFetch } from '../../actions';
import TalkListItem from './TalkListItem';

import { Search } from '../common';


class SearchTalk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      talksSearch: [],
      limit: 10,
      offset: 0,
      refreshing: false,
      onEndReachedCalledDuringMomentum: true
    };
    this.onSearch = this.onSearch.bind(this);
  }


  componentWillMount() {
    const { limit, offset } = this.state;
    this.props.talksFetch({ limit, offset });
  }

  componentDidMount() {
    //this.searchHeader.show();
  }

  onSearch() {
    //console.log(this.searchBar);
    const { limit, offset } = this.state;
    this.props.talksFetch({ limit, offset });
  }

  onRefresh = () => {
    this.setState({ offset: 0, refreshing: true },
      () => {
        const { limit, offset } = this.state;
        this.props.talks = [];
        this.props.talksFetch({ limit, offset });
        this.state.loading = false;
      }
    );
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState(
        {
          offset: this.state.offset + 1,
          loading: true,
          refreshing: false
        },
        () => {
          const { limit, offset } = this.state;
          this.props.talksFetch({ limit, offset });
          this.state.loading = false;
          this.onEndReachedCalledDuringMomentum = true;
        }
      );

    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "70%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
        <Search
          onSearch={this.onSearch}
        />
      </View >
    )
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.talksSearch}
        extraData={this.state}
        renderItem={({ item }) => (<TalkListItem talk={item} />)}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      />
    );
  }
}

const mapStateToProps = state => {
  return state.talks.length > 0 ? { talksSearch: state.talks } : {};
};

const mapDispatchToProps = { talksFetch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchTalk);