import { Platform } from "react-native";
import * as NativeSecureStore from 'expo-secure-store';

class SecureStoreService {
  setItem(key, value) {
    if(Platform.OS === 'web') {
      return localStorage.setItem(key, value);
    }
    return NativeSecureStore.setItemAsync(key, value);
  }

  getItem(key) {
    if(Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return NativeSecureStore.getItemAsync(key);
  }

  deleteItem(key) {
    if(Platform.OS === 'web') {
      return localStorage.removeItem(key);
    }
    return NativeSecureStore.deleteItemAsync(key);
  }
}

export default new SecureStoreService;
