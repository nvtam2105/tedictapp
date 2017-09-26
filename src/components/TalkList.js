import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

import { talksFetch } from '../actions';
import ListItem from './ListItem';

class TalkList extends Component {
    
    componentWillMount() {
        this.props.talksFetch();
        //console.log(this.props);
        this.createDataSource(this.props);
        
    }
    
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps)
    }

    createDataSource({ talks }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(talks);
    }

    renderRow(talk) {
        return <ListItem talk={talk} />;
    }

    render() {
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
           
        );
    }
}

const mapStateToProps = state => {
    return { talks: state.talks };
};
  
const mapDispatchToProps = { talksFetch };

export default connect(mapStateToProps, mapDispatchToProps)(TalkList);
  