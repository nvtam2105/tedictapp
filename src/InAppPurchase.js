import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules

export const productType = 'com.tinyworld.tedictapp'

export function loadProducts() {
  const productTypes = [productType,]
  return new Promise((resolve, reject) => {
    InAppUtils.loadProducts(productTypes, (error, products) => {
      if (error) {
        reject(error)
      }

      resolve(products)
    })
  })
}

export function buyProduct(product) {
  return new Promise((resolve, reject) => {
    InAppUtils.purchaseProduct(product, (error, response) => {
      if (error) {
        reject(error)
      }

      if (response && response.productIdentifier) {
        resolve(response)
      }
    })
  })
}

export function restorePurchases() {
  return new Promise((resolve, reject) => {
    InAppUtils.restorePurchases((error, response) => {
      if (error) {
        reject(error)
      }

      resolve(response)
    })
  })
}