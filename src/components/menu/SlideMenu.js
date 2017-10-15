import React, { Component } from 'react';
import { SectionList } from 'react-native';
import {
  Image, Button, Text,
  ListView, Tile, Title, Subtitle,
  TouchableOpacity, Screen, Divider,
  Caption, Row, View
} from '@shoutem/ui';

import { Actions } from 'react-native-router-flux';

class SlideMenu extends Component {

  renderItem = (row) => {
    return (
      <View>
        <Row>
          <Text styleName="md-gutter-bottom">{row.item.key}</Text>
        </Row>
        <Divider styleName="line" />
      </View>
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
      { data: [{ key: "My Dictation" }, { key: "My Bookmarks" }], key: "" },
      { data: [{ key: "Discover" }], key: "" },
      { data: [{ key: "Help" }, { key: "About" }], key: "" }
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
