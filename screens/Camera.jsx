import { Camera, CameraType } from 'expo-camera/legacy';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View , Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import CameraModal from '../components/modals/cameraModal';
import { useNavigation } from '@react-navigation/native';

import {SERVER_IP} from '@env';

export default function CameraApp() {
 const navigation = useNavigation();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [loading, setLoading] = useState(null);
  const [visible, setVisible] = useState(null);
  const [objectName, setObjectName] = useState(null);
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carb, setCarb] = useState('');
  const [calorie, setCalorie] = useState('');
  const [quantity, setQuantity] = useState('');
  const [foodDetection, setFoodDetection] =useState(null);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to Camera</Text>;
  }

  async function handleTakePicture() {
    
    if (cameraRef) {
      try {
        const imageData = await cameraRef.current.takePictureAsync();
        setImage(imageData.uri);
        console.log(imageData.uri); // Log the image URI

        // Upload the image to the backend
        await uploadImage(imageData.uri);
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function uploadImage(uri) {
    setLoading(true); /// set loading screen

    
    const formData = new FormData();
    
    formData.append('image', {  // Ensure the key matches what the backend expects
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg', // Adjust based on the image type
    });

    FetchAPI(formData);
    
  }

  if (objectName){
    return <CameraModal visible={visible} imageURL={image} objectName={objectName} protein={protein} fat={fat} carb={carb} calorie={calorie} quantity={quantity} goback={() =>{setObjectName(''); setVisible(false)}} foodDetection={foodDetection} goHome={() =>{navigation.navigate('Home')}}/>
  }

  async function FetchAPI(formData){
    const url = `${SERVER_IP}/ScanImage/api`; // Update to your backend URL
    console.log(url)
    await fetch(url, {
      method: 'POST',
      body: formData,
  })
  .then(res =>{
      if(res.ok){
          return res.json();
      }
      if (res === 400){
          return res.json();
      }
  })
  .then(data =>{
      if (data.message){
          console.log(data.message);
          let Macro_Info = data.Macro_Info;
          console.log(Macro_Info)

          setLoading(false)
          setVisible(true)
          setObjectName(Macro_Info['name']);
          setProtein(Macro_Info['protein']);
          setFat(Macro_Info['fat']);
          setCarb(Macro_Info['carb']);
          setCalorie(Macro_Info['calories']);
          setQuantity(Macro_Info['quantity']);
          setFoodDetection(Macro_Info['food']);
        
      }
      
  })
  .catch(error =>{
     console.log(error)
  })
  }

  

  return (
    loading === true ? (
      <View style={{flex:1,justifyContent:'center', backgroundColor:'#000000'}}>
        <ActivityIndicator size='large' color='#FFF085' />
        <Text style={{color:'#FFFFFF', textAlign:'center'}}>Analyzing...</Text>
      </View>
    ) : (
    <>
      <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                />
            </View>

            
            <View style={{ flex: 1, position: 'relative', backgroundColor: 'black' }}>
                <TouchableOpacity style={styles.takeButton} onPress={handleTakePicture}>
                    <Text  style={{ textAlign: 'center', marginTop: 25 }}>Take</Text>
                </TouchableOpacity>
            </View>
      </View>

    </> 
    )
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  cameraContainer: {
    flex: 2,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  camera:{
    height:'100%',
    width:'100%'
  },

  takeButton: {
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    borderRadius: 35,
},
});
