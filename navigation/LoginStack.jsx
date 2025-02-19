import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../models/auth/screens/Login';
import CreateAccount from '../models/auth/screens/CreateAccount';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
<NavigationContainer>
   <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} options={{title:'Crear cuenta'}} />
   </Stack.Navigator>
</NavigationContainer>
  )
}