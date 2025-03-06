import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { app, auth, db, storage } from './config/utils/firebaseConnections';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './models/auth/screens/Home';
import LoginStack from './navigation/NavigationLogger';
import NavigationLogger from './navigation/NavigationLogger';

export default function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("INICIO DE SESIÓN EXITOSO");
        setLogin(true);
      } else {
        alert("Usuario incorrecto")
        setLogin(false);
      }
    });
  }, []);

  if (login) {
    return <LoginStack />;
  } else {
    if (login) {
      return <Home />
    } else {
      return <NavigationLogger />;
    }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});