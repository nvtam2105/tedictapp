import { Platform, Alert, AlertIOS } from 'react-native';
import { NativeModules } from 'react-native';
const { InAppUtils } = NativeModules;
import InAppBilling from 'react-native-billing';


export function buyProduct(product) {
  return Platform.OS === 'ios' ? this.buyProductiOS(product) : this.buyProductAndroid(product);
}

export function restorePurchases() {
  return Platform.OS === 'ios' ? this.restorePurchasesiOS(product) : this.restorePurchasesAndroid(product);
}

function buyProductiOS(product) {
  return new Promise((resolve, reject) => {
    InAppUtils.loadProducts(productIdentifiers, (error, products) => {
      InAppUtils.canMakePayments((canMakePayments) => {
        if (canMakePayments) {
          InAppUtils.purchaseProduct(product, (error, response) => {
            if (error) {
              reject(error);
            }
            if (response && response.productIdentifier) {
              resolve(response);
            }
          })
        }
      })
    })
  })
}

function restorePurchasesiOS() {
  return new Promise((resolve, reject) => {
    InAppUtils.restorePurchases((error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    })
  })
}

function buyProductAndroid(product) {
  return new Promise((resolve, reject) => {
    InAppBilling.open().
      then(() => InAppBilling.purchase(product))
      .then((details) => {
        InAppBilling.getProductDetails(product);
      })
      .then((productDetails) => {
        InAppBilling.close();
        resolve(productDetails);
      })
      .catch((error) => {
        reject(error);
      });
  })

  
}

function restorePurchasesAndroid() {
}