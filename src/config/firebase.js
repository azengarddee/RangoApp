// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEZ0AqU0FfyXWZeuxCOPTAjbk5UzEXry8",
  authDomain: "rango-app-1cd13.firebaseapp.com",
  projectId: "rango-app-1cd13",
  storageBucket: "rango-app-1cd13.firebasestorage.app",
  messagingSenderId: "41159457425",
  appId: "1:41159457425:web:51355015d766e8a5a9dd30"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
