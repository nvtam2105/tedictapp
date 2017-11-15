import { AsyncStorage } from 'react-native';

export const getItem = async (key) => {
    return await AsyncStorage.getItem(key);
}

export const setItem = async (key, value) => {
    return await AsyncStorage.setItem(key, value);
}