import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";

//
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAXk-cpBNK1lODu9R9YjcHm7lJmLq6eunQ",
  authDomain: "semana-3-60fc6.firebaseapp.com",
  databaseURL: "https://semana-3-60fc6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "semana-3-60fc6",
  storageBucket: "semana-3-60fc6.appspot.com",
  messagingSenderId: "346424335548",
  appId: "1:346424335548:web:aa9e5b5203574813ae44b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app) // base de datos
export const storage=getStorage(app)

//export const auth = getAuth(app)
////////


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});