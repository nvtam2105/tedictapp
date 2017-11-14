import { AsyncStorage } from 'react-native';

export async function getItem(key) {
    return await AsyncStorage.getItem(key);
}

export async function setItem(key, value) {
    return await AsyncStorage.setItem(key, value);
}