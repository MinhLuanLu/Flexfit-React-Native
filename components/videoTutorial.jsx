import React, { Component, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View,Image, ScrollView } from 'react-native'
import FitnessMenu_Modal from './modals/fitnessMenu_Modal'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native'
import VideoList from './modals/videoList_Modal'

const muscle_group = require('../assets/images/muscle_group.png')
const strength_training = require('../assets/images/strength_training.png')
const crossfit = require('../assets/images/crossfit.png')
const fullbody_workout = require('../assets/images/fullbody_workout.png')
const cardio_homescreen = require('../assets/images/cardio_homescreen.png')


const chest_workout = require('../assets/images/chest_workout.png')
const shoulder_workout = require('../assets/images/shoulder_workout.png')
const arms_workout = require('../assets/images/arms_workout.png')
const back_workout = require('../assets/images/back_workout.png')
const legs_workout = require('../assets/images/legs_workout.png')
import {SERVER_IP} from '@env'

export default function VideoTutorial(){

  const [visible, setVisible] = useState(false)

  const [videoListVisible,setVideoListVisile] = useState(false)

  const [titile_Text, settitile_Text] = useState()

  const navigation = useNavigation()
  const [videoData, setVideoData] = useState()
  const [playVideo, setPlayVideo] = useState(false)

  async function handleFetch(categogy){
    let data = {
        "Categogy": categogy,
    }

    setPlayVideo(true)

    fetch(`${SERVER_IP}/Video/api`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
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
            console.log(data.message)
            setVideoData(data.Video_data)
        }
    })
  }

    return (
      <ScrollView style={styles.Container}>

        <Swiper style={styles.wrapper} showsButtons={false}>
            <View style={styles.slide1}>
              
              <TouchableOpacity style={styles.imageContainer} onPress={()=> setVisible(true)}>
                <Image source={muscle_group} resizeMode='cover' style={styles.image_style}/>
                <Text style={styles.text}>Muscle Group</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageContainer} onPress={()=> {setVideoListVisile(true), handleFetch('Strength'), settitile_Text('Strength')}}>
                <Image source={strength_training} resizeMode='cover' style={styles.image_style}/>
                <Text style={styles.text}>Strength</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageContainer} onPress={()=>{setVideoListVisile(true), handleFetch('CrossFit'), settitile_Text('CrossFit')}}>
                <Image source={crossfit} resizeMode='cover' style={styles.image_style}/>
                <Text style={styles.text}>CrossFit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageContainer}  onPress={()=>{setVideoListVisile(true), handleFetch('Full-Body'), settitile_Text('Full-Body Exercise')}}>
                <Image source={fullbody_workout} resizeMode='cover' style={styles.image_style}/>
                <Text style={styles.text}>Full-Body Exercise</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageContainer}  onPress={()=>{setVideoListVisile(true), handleFetch('Cardio'), settitile_Text('Cardio')}}>
                <Image source={cardio_homescreen} resizeMode='cover' style={styles.image_style}/>
                <Text style={styles.text}>Cardio</Text>
              </TouchableOpacity>

            </View>
            
        </Swiper>

        

          <FitnessMenu_Modal visible={visible} onclose={()=> setVisible(false)}/>
            <VideoList visible={videoListVisible} onclose={()=> setVideoListVisile(false)} data={videoData} titile_Text={titile_Text}/>
          
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    Container:{
      flex:1,
      display:'flex',
      flexDirection:'column'
    },

    
    wrapper:{
      height:800
    },

    slide1:{
      height:800,
      display:'flex',
      flexDirection:'column',
      justifyContent:'center'
    },

    imageContainer:{
      flex:1, 
      justifyContent:'center'
    },

    image_style:{
      height:'90%', 
      width:'100%'
    },

    text:{
      position:'absolute',
      fontSize:20,
      fontWeight:'600',
      color:'#000000',
      backgroundColor:'#E0E0E0',
      padding:5,
      borderRadius:2,
      marginLeft:5
    },
  })