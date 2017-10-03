import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import ContentView from './ContentView';

class SideDrawer extends Component {
  render() {
    return (
      <Drawer
        ref='drawer'
        type="overlay"
        content={<ContentView />}
        tapToClose={true}
        openDrawerOffset={0.2} 
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={{ drawer: drawerStyle, main: mainStyle }}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    )
  }
};

export default SideDrawer;