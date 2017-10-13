import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { talksSearch } from '../../actions';
import TalkListItem from './TalkListItem';

import { SearchBar } from '../common';


class SearchTalk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      talks: [],
      limit: 10,
      offset: 0,
      preSearch: '',
      search: '',
      refreshing: false,
      onEndReachedCalledDuringMomentum: true
    };
    this.onSearch = this.onSearch.bind(this);
  }


  componentWillMount() {
  }

  componentDidMount() {
  }

  onSearch(keyword) {
    this.setState({
      loading: true,
      limit: 10,
      offset: 0,
      preSearch: this.state.search,
      search: keyword
    }, () => {
      const { preSearch, search, limit, offset } = this.state;
      if (search) {
        this.props.talksSearch({ preSearch, search, limit, offset });
        this.setState({
          loading: false,
        })
      }
    });
  }

  onRefresh = () => {
    this.setState({
      offset: 0,
      limit: 10,
      preSearch: '',
      refreshing: true
    }, () => {
      const { preSearch, search, limit, offset } = this.state;
      if (search) {
        this.props.talksSearch({ preSearch, search, limit, offset });
      }
      this.setState({
        loading: false,
      })
    }
    );
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState(
        {
          offset: this.state.offset + 1,
          loading: true,
          refreshing: false,
          preSearch: this.state.search,
        }, () => {
          const { preSearch, search, limit, offset } = this.state;
          if (search) {
            this.props.talksSearch({ preSearch, search, limit, offset });
          }
          this.setState({
            loading: false,
            onEndReachedCalledDuringMomentum: true,
          })
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
        <SearchBar
          ref={(ref) => {
            this.searchBar = ref
          }}
          //returnKeyType="done"
          //blurOnSubmit={true}
          onSearch={this.onSearch}
          autoCapitalize="none"
        //cancelButtonWidth={80}
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
        data={this.props.talks}
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
  return state.talksSearch.length > 0 ? { talks: state.talksSearch } : {};
};

const mapDispatchToProps = { talksSearch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchTalk);