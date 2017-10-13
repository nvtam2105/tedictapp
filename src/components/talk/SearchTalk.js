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
      search: '',
      refreshing: false,
      onEndReachedCalledDuringMomentum: true
    };
    this.onChangeText = this.onChangeText.bind(this);
  }


  componentWillMount() {
    const { limit, offset } = this.state;
    console.log(this.props);
    
    //this.props.talksFetch({ limit, offset });
  }

  componentDidMount() {
  }

  onChangeText(keyword) {
    
    this.setState({
      limit: 10,
      offset: 0,
      search: keyword,
    });

    const { search, limit, offset } = this.state;
    if (this.state.search) {
      this.props.talksSearch({ search, limit, offset });
      console.log(search);
    }
  }

  onRefresh = () => {
    this.setState({ offset: 0, refreshing: true },
      () => {
        this.setState({
          limit: 10,
          offset: 0,
        });
        const { search, limit, offset } = this.state;
        this.props.talks = [];
        if (this.state.search) {
          this.props.talksSearch({ search, limit, offset });
        }
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
          const { search, limit, offset } = this.state;
          if (this.state.search) {
            console.log(search);
            this.props.talksSearch({ search, limit, offset });
          }
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
        <SearchBar
          ref={(ref) => {
            this.searchBar = ref
          }}
          //returnKeyType="done"
          blurOnSubmit={true}
          onChangeText={this.onChangeText}
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
        //extraData={this.state}
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