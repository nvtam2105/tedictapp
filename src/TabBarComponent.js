import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from './NavigationConfiguration'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        navigationState: state.tabBar,
    }
}

class TabBarComponent extends Component {
    render() {
        return (
            <TabBar
                navigation={
                    addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.navigationState,
                    })
                }
            />
        )
    }
}

export default connect(mapStateToProps)(TabBarComponent)