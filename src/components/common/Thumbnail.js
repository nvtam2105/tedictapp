import React from 'react';
import { View, Image } from 'react-native';

const Thumbnail = (props) => {
  const { stretch } = styles;
  return (
    <View style={stretch}>
      <Image
        style={stretch}
        source={{ uri: props.source }}
      />
    </View>
  );
};

const styles = {
  stretch: {
    width: 120,
    height: 120
  }
};

export { Thumbnail };
