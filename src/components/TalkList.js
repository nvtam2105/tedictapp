import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { connect } from 'react-redux';
import { talksFetch } from '../actions';
import TalkListItem from './TalkListItem';

class TalkList extends Component {

    constructor(props) {
        super(props);   
        this.state = {
          loading: false,
          talks: [],
          limit: 10,
          offset: 0,
          refreshing: false,
          onEndReachedCalledDuringMomentum: true
        };
    }

    componentWillMount() {
        const { limit, offset } = this.state;
        this.props.talksFetch({limit, offset});
    }

    componentWillReceiveProps(nextProps) {
    }
    
    onRefresh = () => {
        this.setState({ offset: 0, refreshing: true },
            () => {
                const { limit, offset } = this.state;
                this.props.talks = [];
                this.props.talksFetch({limit, offset});
                this.state.loading = false;
            }
        );
    };

    onEndReached = () => {
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
        <FlatList style={{flex:1}}
            data={this.props.talks}
            renderItem={({ item }) => (<TalkListItem talk={item} />)}                     
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.onEndReached}
            bounces={false}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        
        />
        );
    }
}

const mapStateToProps = state => {
    return state.talks.length > 0 ?  { talks: state.talks } : {};
};
  
const mapDispatchToProps = {talksFetch};

export default connect(mapStateToProps, mapDispatchToProps)(TalkList);
  