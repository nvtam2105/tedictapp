import React, { Component } from 'react';
//import { Text, View, Button, SectionList } from 'react-native';
import { Image, Button, Text, ListView, Tile, Title, Subtitle, TouchableOpacity, Screen, Divider } from '@shoutem/ui';

import { Actions } from 'react-native-router-flux';

class SlideMenu extends Component {

  renderItem = (row) => {
    return (
      <Tile>
        <Title styleName="md-gutter-bottom">{row.key}</Title>
        <Subtitle styleName="sm-gutter-horizontal">{row.key}</Subtitle>
      </Tile>

    );
  }

  renderSectionHeader = (row) => {
    return (
      <Text>{"header " + row.section.key}</Text>
    );
  }

  renderSectionFooter = (row) => {
    return (
      <Text>{"footer " + row.section.key}</Text>
    );
  }

  render() {
    const sectionListData = [
      { data: [{ key: "item1" }, { key: "item2" }], key: "section1" },
      { data: [{ key: "item3" }], key: "section2" },
      { data: [], key: "section3" },
      { data: [{ key: "item4" }, { key: "item5" }], key: "section4" },
    ];
    return (
      // <SectionList
      //   sections={sectionListData}
      //   renderItem={this.renderItem}
      //   renderSectionHeader={this.renderSectionHeader}
      //   renderSectionFooter={this.renderSectionFooter}
      // />

      <ListView
        data={sectionListData}
        renderRow={this.renderItem}
      />
      // <Button>
      //   <Text>CHECK IN HERE</Text>
      // </Button>

    );
  }
}

export default SlideMenu;
