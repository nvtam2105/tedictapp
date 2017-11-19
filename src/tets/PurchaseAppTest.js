import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Alert, AlertIOS, TouchableOpacity } from 'react-native';
import InAppBilling from 'react-native-billing';
import { NativeModules } from 'react-native';
const { InAppUtils } = NativeModules;


class PurchaseApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseText: "",
            productDetailsText: "",
            error: "",

            productsLoaded: false,
        }
    }

    componentDidMount() {
        // loadProducts().then((res) => {
        //     this.setState({ productsLoaded: true })
        // }).catch(error => {
        //     Alert.alert(error);
        // })

    }



    componentWillMount() {
        if (Platform.OS === 'android') {
           
        } else {

        }

    }
    restorePurchases() {
        InAppUtils.restorePurchases((error, response) => {
            if (error) {
                Alert.alert('itunes Error', 'Could not connect to itunes store.');
            } else {
                

                if (response.length === 0) {
                    Alert.alert('No Purchases', "We didn't find any purchases to restore.");
                    return;
                }

                response.forEach((purchase) => {
                    if (purchase.productIdentifier === 'com.tinyworld.tedictapp') {
                        // Handle purchased product.
                        Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
                    }
                });
            }
        });
    }

    purchaseTest() {
        var productIdentifiers = [
            'com.tinyworld.tedictapp',
        ];
        InAppUtils.loadProducts(productIdentifiers, (error, products) => {
            InAppUtils.purchaseProduct(productIdentifiers[0], (error, response) => {
                if (response && response.productIdentifier) {
                    Alert.alert('Purchase Successful. Your Transaction ID is ' + response.transactionIdentifier);
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
                    <TouchableOpacity onPress={() => this.purchaseTest()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Purchase</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.restorePurchases()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>restorePurchases</Text>
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