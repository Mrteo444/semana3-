import { ImageBackground,StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen( {navigation} : any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')


  // function registro() {
  //   createUserWithEmailAndPassword(auth, correo, contrasenia)
  //     .then((userCredential) => {
  //       // Signed up 
  //       const user = userCredential.user;

  //       navigation.navigate('Drawer_Welcome')
        
  //       //console.log('Registro exitoso')
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //      console.log(errorCode)
  //       if ( errorCode === 'auth/email-already-in-use'){
  //         Alert.alert('Error', 'El correo ingresado ya esta en uso')
  //       }

  //     });
  // }
  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        navigation.navigate('Drawer_Welcome')
        
        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
       console.log(errorCode)

        switch (errorCode) {
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'El correo ingresado ya esta en uso')
            break;

          // Agregue más casos según sea necesario

          default:
            Alert.alert('Error', 'Se ha producido un error desconocido')
            break;
        }

      });
 }

  return (
    <ImageBackground

      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKalSixOk2ePgoNBqLbKjmfF8xwuZlLc6U0Q&usqp=CAU' }}
      style={styles.container}
    >
      <Text>RegistroScreen</Text>
      <TextInput
        placeholder='ingrese email'
        onChangeText={(texto) => setcorreo(texto)}
        style={styles.input}
        

      />

      <TextInput
        placeholder='ingrese contrasenia'
        onChangeText={(texto) => setContrasenia(texto)}
        style={styles.input}
      />


      <TouchableOpacity style={styles.but} onPress={()=> registro()}>
        <Text style={{ color: 'white' }}>Entrar</Text>
      </TouchableOpacity>

      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 16,
    padding: 8,
    width: '100%',
    color: 'black'
  },
  but: {
    borderRadius: 50,
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginBottom: 20
}
})