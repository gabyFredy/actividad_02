import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBm64oHwdt5oXxowT-L_b-fwjqDkvs5Odg",
    authDomain: "tienda-utez-c367a.firebaseapp.com",
    projectId: "tienda-utez-c367a",
    storageBucket: "tienda-utez-c367a.firebasestorage.app",
    messagingSenderId: "93441219707",
    appId: "1:93441219707:web:c5b7e436b902e9047fd6de"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };