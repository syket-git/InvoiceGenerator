import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: Record<string, string>) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log(key, jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
