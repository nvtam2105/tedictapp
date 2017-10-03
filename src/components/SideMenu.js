import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

class SideMenu extends Component {
    
    render() {
        return (
            <View style={styles.container}>
            <TouchableHighlight>
            <Text>Home</Text>
            </TouchableHighlight>
            <TouchableHighlight>
            <Text>Profile</Text>
            </TouchableHighlight>
            <TouchableHighlight>
            <Text>Friends</Text>
            </TouchableHighlight>
            </View>
            );
        }
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white'
    },
    })

export default SideMenu;