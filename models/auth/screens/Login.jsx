import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {isEmpty} from "lodash"
import { Card, Button, Input, Image, Icon } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const {navigation} = props;
  const [showPassword, setShowPassword]= useState(true);
  const [email, setEmail]= useState("");
  const [error, setError]=useState({email:'', password:''});
  const [password, setPassword]= useState("");
  
  const handleLogin=()=>{
    if(isEmpty(email) || isEmpty(password)){
      setError({
        email:"El correo electrónico es requerido",
        password:"La contraseña es requerida"
      });
    }else{
      setError({email:"", password:""});
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("Iniciando: ", user);
          
          // ...
        })
        .catch((error) => {
          console.log("Error al iniciar sesion");
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  return (
    <View style={styles.container}>
    <Card>
        <View style={{ alignItems: "center"}}>
        <Image
        source={{uri:"https://cdn-icons-png.flaticon.com/128/833/833314.png"}}
        style={{width: 100, height: 100}}
        />
        </View>
    <Text>Nombre</Text>
    <Input
      placeholder='Nombre'
      leftIcon={{ type: 'material-community', name: 'account-outline' }}
      onChange={({nativeEvent:{text}})=>setEmail(text)}
      errorMessage={error.email}
    />
  <Text>Contraseña</Text>
    <Input
      placeholder='Contraseña'
      leftIcon={{ type: 'material-community', name: 'asterisk' }}
      secureTextEntry={showPassword}
      onChange={({nativeEvent:{text}})=>setPassword(text)}
      errorMessage={error.password}
      rightIcon={
              <Icon
                onPress={()=>setShowPassword(!showPassword)}
                type='material-community'
                name={showPassword?"eye-outline":"eye-off-outline"}
              />
            }
    />

    <Button 
        title={"Iniciar sesión"}
        buttonStyle={{ backgroundColor: '#008D8C'}}
        onPress={handleLogin}
    />

    <Button
      type='clear'
      title={'Crear cuenta'}
      onPress={() => navigation.navigate('CreateAccount')}
    />

</Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'90px', 
    justifyContent: 'center'
  },
});