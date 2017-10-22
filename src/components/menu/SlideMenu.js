import React, { Component } from 'react';
import { SectionList } from 'react-native';
import {
  Image, Button, Text,
  ListView, Tile, Title, Subtitle,
  TouchableOpacity, Screen, Divider,
  Caption, Row, View, Icon
} from '@shoutem/ui';

import { Actions } from 'react-native-router-flux';

class SlideMenu extends Component {

  renderItem = (row) => {
    return (
      <Row styleName="small">
        <Icon name={row.item.icon} />
        <View styleName="vertical">
          <Text>{row.item.key}</Text>
        </View>
      </Row>

    );
  }

  renderSectionHeader = (row) => {
    return (
      <Divider styleName="section-header">
        <Caption>{row.section.key}</Caption>
      </Divider>
    );
  }

  // renderSectionFooter = (row) => {
  //   return (
  //     <Divider styleName="line" />
  //   );
  // }

  render() {
    const sectionListData = [
      { data: [{ key: "My Dictation", icon: "add-to-favorites-off" }, { key: "Discover", icon: "social-wall" }, { key: "Notifications", icon: "notifications" }], key: "" },
      { data: [{ key: "Settings", icon: "settings" }], key: "" },
      { data: [{ key: "Rate App", icon: "like" }, { key: "Feedback", icon: "email" }, { key: "About", icon: "about" }], key: "" }
    ];
    return (
      <SectionList
        style={{ marginTop: 50 }}
        sections={sectionListData}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
      //renderSectionFooter={this.renderSectionFooter}
      />
    );
  }
}

export default SlideMenu;
