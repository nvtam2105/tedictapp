import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { talksFetch } from '../actions';

class TalkList extends Component {
    

    componentWillMount() {
        this.props.talksFetch();  
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
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
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}


const mapStateToProps = state => {
    const talks = _.map(state.talks, (val, uid) => {
      return { ...val, uid };
    });
  
    return { talks };
};
  
export default connect(mapStateToProps, { talksFetch })(TalkList);
  