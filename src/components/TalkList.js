import _ from 'lodash';
import React, { Component } from 'react';
//import { ListView } from 'react-native';
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

import { connect } from 'react-redux';
import { talksFetch } from '../actions';
//import ListItem from './ListItem';

class TalkList extends Component {

    constructor(props) {
        super(props);   
        this.state = {
          loading: false,
          talks: [],
          limit: 10,
          offset: 0,
          refreshing: false
        };
    }


    componentWillMount() {
        const { limit, offset } = this.state;
        console.log(this.state);
        this.props.talksFetch({limit, offset});
        console.log(this.props);
        
    }

    
    talksFetchRefresh = () => {
        this.setState({ offset: 0, refreshing: true },
            () => {
                const { limit, offset } = this.state;
                this.props.talksFetch({limit, offset});
            }
        );
    };

    talksFetchMore = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState(
                { offset: this.state.offset + 1,
                  loading: true,
                  refreshing: false
                },
                () => {
                    const { limit, offset } = this.state;
                    this.props.talksFetch({limit, offset});
                    this.state.loading = false;
                }
            );
            this.onEndReachedCalledDuringMomentum = true;
        }
    };

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
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.props.talks}
                    renderItem={({ item }) => (
                    <ListItem
                        
                        title={`${item.name}`}
                        subtitle={item.description}
                        avatar={{ uri: item.image_16x9 }}
                        containerStyle={{ borderBottomWidth: 0 }}
                    />
                    )}
                keyExtractor={item => item.id}
                   ItemSeparatorComponent={this.renderSeparator}
                   ListFooterComponent={this.renderFooter}
                   onRefresh={this.talksFetchRefresh}
                   refreshing={this.state.refreshing}
                   onEndReached={this.talksFetchMore}
                   onEndReachedThreshold={0.5}
                   onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                
                />
            </List>
        );
    }
}

const mapStateToProps = state => {
    return { talks: state.talks };
};
  
const mapDispatchToProps = { talksFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkList);
  