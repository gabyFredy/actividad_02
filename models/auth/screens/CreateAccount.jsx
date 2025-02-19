import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Card, Button, Input, Image, Icon } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../config/utils/firebaseConnections';

export default function CreateAccount() {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword]=useState(true);

    const handleRegister = () => {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return; 
      }
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Usuario creado:", userCredential.user);
          alert("Cuenta creada con éxito");
          return <Home/>; 
        })
        .catch((error) => {
          alert(error.message);
        });
    };

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
      placeholder='Correo'
      onChange={({nativeEvent:{text}})=>setEmail(text)}
      leftIcon={{ type: 'material-community', name: 'account-outline' }}
    />
  <Text>Contraseña</Text>
    <Input
      placeholder='Contraseña'
      onChange={({nativeEvent:{text}})=>setPassword(text)}
      leftIcon={{ type: 'material-community', name: 'asterisk' }}
      secureTextEntry={showPassword}
      rightIcon={
        <Icon
          onPress={()=>setShowPassword(!showPassword)}
          type='material-community'
          name={showPassword?"eye-outline":"eye-off-outline"}
        />
      }
    />

    <Text>Confirmar contraseña</Text>
    <Input
      placeholder='Contraseña'
      leftIcon={{ type: 'material-community', name: 'asterisk' }}
      onChange={({nativeEvent:{text}})=>setConfirmPassword(text)}
      secureTextEntry={showConfirmPassword}
      rightIcon={
        <Icon
          onPress={()=>setShowConfirmPassword(!showConfirmPassword)}
          type='material-community'
          name={showConfirmPassword?"eye-outline":"eye-off-outline"}
        />
      }
    />

    <Button 
        title={"Crear cuenta"}
        buttonStyle={{ backgroundColor: '#008D8C'}}
        onPress={handleRegister}
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