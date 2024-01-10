import { ImageBackground,Button, StyleSheet, Text, Image,Alert} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadByte,getDownloadURL } from "firebase/storage";
import { storage } from '../config/Config';
import { TouchableOpacity } from 'react-native-gesture-handler'


import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true)


export default function GeneralScreen() {
  const [imagen, setImagen] = useState(' ');

  
  //cargar imagen desde falaeria 
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.getCameraPermissionsAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImagen(result.assets[0].uri);
      }
    };

    //subir imagen 

    async function subirImagen(nombre:String) {
      const storageRef = ref(storage, 'usuarios/' + nombre);
  
      try {
          const response = await fetch(imagen);
          const blob = await response.blob();
  
          await uploadBytes(storageRef, blob, {
              contentType: 'image/jpg'
          });
  
          console.log('La imagen se subió con éxito');
          Alert.alert('Mensaje','Imagen cargada')
  
          // Obtiene la URL de la imagen
          const imageURL = await getDownloadURL(storageRef);
          console.log('URL de desacarga de la imagen', imageURL);
      } catch (error) {
          console.error(error);
      }
  }
  




 

  return (
    <ImageBackground

    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKalSixOk2ePgoNBqLbKjmfF8xwuZlLc6U0Q&usqp=CAU' }}
    style={styles.container}
  >
      <Text>GeneralScreen</Text>
      <TouchableOpacity style={styles.but} onPress={() => pickImage()}>
        <Text style={{ color: 'white' }}>Entrar</Text>
      </TouchableOpacity>
      
      <Image source={{uri :imagen}} style={styles.img}  />
      <TouchableOpacity style={styles.but} onPress={() =>subirImagen('')}>
        <Text style={{ color: 'white' }}>Entrar</Text>
      </TouchableOpacity>
      
     
    </ImageBackground>
  )
  }

const styles = StyleSheet.create({
  img : {
    width:300,
    height:300,
    resizeMode:'contain'
  },
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