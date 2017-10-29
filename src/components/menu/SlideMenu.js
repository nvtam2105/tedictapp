import React, { Component } from 'react';
import { SectionList, TouchableWithoutFeedback } from 'react-native';
import {
  Image, Button, Text,
  ListView, Tile, Title, Subtitle,
  TouchableOpacity, Screen, Divider,
  Caption, Row, View, Icon
} from '@shoutem/ui';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Actions } from 'react-native-router-flux';

class SlideMenu extends Component {

  renderItem = (row) => {
    return (
      <TouchableWithoutFeedback onPress={Actions[row.item.scene]}>
        <Row>
          <View styleName="horizontal stretch" 
            style={{alignItems: 'center', flexDirection: 'row'}}>
            <MaterialIcons name={row.item.icon} size={25} />
            <Text style={{ paddingLeft: 15 }}>{row.item.key}</Text>
          </View>
        </Row>
      </TouchableWithoutFeedback>

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
      {
        data: [{ key: "My Talks", icon: "star-border", scene: "talkMarkList" },
        { key: "Discover", icon: "format-list-bulleted", scene: "TalkNewestList" },
        { key: "Notifications", icon: "notifications-none", scene: "nofitications" }], key: ""
      },
      { data: [{ key: "Settings", icon: "settings", scene: "talkMarkList" }], key: "" },
      {
        data: [{ key: "Rate App", icon: "star", scene: "talkMarkList" },
        { key: "Feedback", icon: "email", scene: "talkMarkList" },
        { key: "About", icon: "error-outline", scene: "talkMarkList" }], key: ""
      }
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
