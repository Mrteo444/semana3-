import { ImageBackground,Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function LoginScreen({navigation}: any) {

const [correo, setCorreo] = useState('')
const [contrasenia, setContrasenia] = useState('')

function login(){
  signInWithEmailAndPassword(auth, correo, contrasenia)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   // navigation.navigate('Drawer_Welcome')


    console.log(user);

    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage)

    switch (errorCode) {
      case "auth/invalid-credential":
        Alert.alert("Error ","CORREO incorrectas")
        break;
      case "auth/wrong-password":
        Alert.alert("Error ","Contraseña perida")
        break;
      default:
        Alert.alert("ERROR")
    }

    

  });
}

  return (
    <ImageBackground

      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKalSixOk2ePgoNBqLbKjmfF8xwuZlLc6U0Q&usqp=CAU' }}
      style={styles.container}
    >
    
      <Text style={{fontSize:30}}>Login</Text>
      <TextInput 
        placeholder='Ingrese correo'
        onChangeText={ (texto)=> setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput 
        placeholder='Ingresar contraseña'
        onChangeText={ (texto)=> setContrasenia(texto)}
      />

     
      <Button title='Ingresar' onPress={()=> login()}/>

      <Text onPress={()=> navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{

  }
})