import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { getAuth, signOut } from 'firebase/auth'
import React from 'react'

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Cerrar sesion" onPress={() => signOut(getAuth())} />
    </View>
  )
}