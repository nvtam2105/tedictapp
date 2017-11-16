import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InAppBilling from 'react-native-billing';

class AndroidPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseText: "",
            productDetailsText: "",
            error: ""
        }
    }

   


    componentWillMount() {
        InAppBilling.open().
        then(() => InAppBilling.purchase('android.test.purchased'))
        .then((details) => {
          this.setState({
            purchaseText: details.productId
          });
          return InAppBilling.getProductDetails('android.test.purchased');
        })
        .then((productDetails) => {
          this.setState({
            productDetailsText: productDetails.title
          });
          return InAppBilling.close();
        })
        .catch((error) => {
          this.setState({
            error: error
          });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    InApp Billing sample:
            </Text>
                <Text style={styles.instructions}>
                    Purchase: {this.state.purchaseText}
                </Text>
                <Text style={styles.instructions}>
                    Product details: {this.state.productDetailsText}
                </Text>
                <Text style={styles.instructions}>
                    Error: {this.state.error}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default AndroidPay;