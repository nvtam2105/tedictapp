import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { Actions } from 'react-native-router-flux';


import { connect } from 'react-redux';
import { talksFetch } from '../../actions';
import TalkListItem from './TalkListItem';


import { SearchBar } from '../common';
//import SearchHeaderComponent from 'react-native-search-header';


//import SearchBar from 'react-native-searchbar';
//import { SearchBar } from "react-native-elements";
//import SearchBar from 'react-native-material-design-searchbar';
//import SearchHeaderComponent from 'react-native-search-header';
//const SearchHeader = SearchHeaderComponent();

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
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }


  componentWillMount() {
    const { limit, offset } = this.state;
    //this.props.talksFetch({ limit, offset` });
    //this.searchHeader.show();
  }

  componentDidMount() {
    //this.searchHeader.show();
  }

  onSubmitEditing() {
    console.log(this.searchBar);
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
      <SearchBar
        
      />
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
      // <View style={{ flex: 1 }}>
      //   <SearchBar
      //     ref={(ref) => this.searchBar = ref}
      //     hideBack

      //     //data={items}
      //     //handleResults={this._handleResults}
      //     showOnLoad
      // />
      // </View>
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