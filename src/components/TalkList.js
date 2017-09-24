import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class TalkList extends Component {
    
    componentWillMount() {
        const ds  = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(this.props.talks);
        console.log(this.props.talks);
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

const mappStateToProps = state => {
    return { talks: state.talks };
};

export default connect(mappStateToProps)(TalkList);