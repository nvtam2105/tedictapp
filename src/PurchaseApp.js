import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Alert, AlertIOS,TouchableOpacity } from 'react-native';
import InAppBilling from 'react-native-billing';
import { NativeModules } from 'react-native';
const { InAppUtils } = NativeModules;

class PurchaseApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseText: "",
            productDetailsText: "",
            error: ""
        }
        //this.purchase.bind(this);
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
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
        } else {

        }

    }

    onPurchaseBtnPress_() {
        var products = ['com.tinyworld.tedictapp'];
        InAppUtils.loadProducts(products, (error, product) => {
            InAppUtils.canMakePayments((canMakePayments) => {
                if (!canMakePayments) {
                    Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
                } else {
                    InAppUtils.purchaseProduct(product.identifier, (error, response) => {
                        console.log(product.productIdentifier);
                        if (response && response.productIdentifier) {
                            AlertIOS.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
                        }
                        else if (error) {
                            /* error occurs here  */
                            AlertIOS.alert('Purchase Failed', error);
                            /* this would fix */
                            //AlertIOS.alert('Purchase Failed', 'Could not connect to itunes store.');
                        }
                    });
                }
            });

        });
    }

    render() {
        if (Platform.OS === 'android') {
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
        } else {
            return (
                <View style={styles.container} >
                    <TouchableOpacity onPress={() => this.onPurchaseBtnPress_()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Purchase</Text>
                    </TouchableOpacity>
                </View>
            );
        }
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
        marginBottom: 2,
    },
    feedback: {
        textAlign: 'center',
        color: '#996633',
        marginBottom: 3,
    },
    button: {
        backgroundColor: "teal",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 15,
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        backgroundColor: "transparent"
    },
});

export default PurchaseApp;