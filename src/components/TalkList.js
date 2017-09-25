import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

import { talksFetch } from '../actions';
import ListItem from './ListItem';

class TalkList extends Component {
    

    componentWillMount() {
        this.props.talksFetch();  
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
        //console.log(this.props);
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
    // const talks = _.map(state.talks, (val, uid) => {
    //   return { ...val, uid };
    // });
    //console.log(state.talks);
    return { talks : state.talks };
};
  
export default connect(mapStateToProps, { talksFetch })(TalkList);
  