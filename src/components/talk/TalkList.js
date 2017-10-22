import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { talksFetch } from '../../actions';
import TalkListItem from './TalkListItem';

import { FlatList, ActivityIndicator } from "react-native";
import { View, Divider } from '@shoutem/ui';


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
        this.props.talksFetch({ limit, offset });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({ refreshing: false, loading: false });
    }

    onRefresh = () => {
        this.setState({ offset: 0, refreshing: true },
            () => {
                const { limit, offset } = this.state;
                this.props.talksFetch({ limit, offset });
                
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
                    this.onEndReachedCalledDuringMomentum = true;
                }
            );

        }
    };

    renderSeparator = () => {
        return (
            <Divider styleName="line" />
        );
    };

    renderFooter = () => {
        return (
            <View style={{ paddingVertical: 20 }}>
                {this.state.loading &&
                    (<ActivityIndicator animating size="large" />)
                }
            </View >)
    };

    render() {
        return (
            <FlatList style={{ flex: 1 }}
                data={this.props.talks}
                extraData={this.state}
                renderItem={({ item }) => (<TalkListItem talk={item} />)}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={this.renderSeparator}
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
    return state.talks.length > 0 ? { talks: state.talks } : {};
};

const mapDispatchToProps = { talksFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkList);
