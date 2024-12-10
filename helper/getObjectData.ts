import AsyncStorage from '@react-native-async-storage/async-storage';

export const getObjectData = async (key: string) => {
  try {
    console.log({ key });
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
