import { Platform, Alert, AlertIOS } from 'react-native';
import { NativeModules } from 'react-native';
const { InAppUtils } = NativeModules;
import InAppBilling from 'react-native-billing';

export const buyProduct = (product) => {
  return Platform.OS === 'ios' ? buyProductiOS(product) : buyProductAndroid(product);
}

export const restorePurchase = (product) => {
  return Platform.OS === 'ios' ? restorePurchaseiOS(product) : restorePurchaseAndroid(product);
}

export const buyProductiOS = (product) => {
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

export const buyProductAndroid = (product) => {
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

export const restorePurchaseiOS = (product) => {
  return new Promise((resolve, reject) => {
    InAppUtils.restorePurchases((error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    })
  })
}

export const restorePurchaseAndroid = (product) => {
}

export default { buyProduct, restorePurchase }