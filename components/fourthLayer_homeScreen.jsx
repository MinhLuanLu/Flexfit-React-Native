import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import Calendarlay from "./calendar";
import { useState } from "react";
import Swiper from "react-native-swiper";
const fullbody_workout = require('../assets/images/fullbody_workout.png')
const fullbody_workout_female = require('../assets/images/fullbody_workout_female.png')
const strength_training = require('../assets/images/strength_training.png')
const crossfit = require('../assets/images/crossfit.png')
const cardio_homescreen = require('../assets/images/cardio_homescreen.png')
const chest_workout_female = require('../assets/images/chest_workout_female.png')

const chest_workout = require('../assets/images/chest_workout_homeScreen.png')
const shoulder_workout = require('../assets/images/shoulder_workout.png')

import {SERVER_IP} from '@env'
import VideoList from "./modals/videoList_Modal";


export default function FourthLayer() {

  const [videoVisible, setVideoVisible] = useState(false)
  const [title_Text, setTitle_Text] = useState()
  const [videoTitle, setVideoTitle] = useState()
  const [videoData, setVideoData] = useState()

  async function handleFetch(Categogy,Video_Type){

    let postdata = {
      "Categogy": Categogy,
      "Video_Type": Video_Type
    }

    await fetch(`${SERVER_IP}/Video/api`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata)
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
    <>
    <View style={styles.container}>
      <View style={styles.workoutPlanContainer}>
        <Text style={styles.headerText}>Workout Plan For You</Text>
        <TouchableOpacity onPress={()=>{setVideoVisible(true), handleFetch('Full-Body'), setTitle_Text('Full-Body Exercise')}}>
            <Image source={fullbody_workout_female} resizeMode="cover" style={styles.imageStyle}/>
            <Text style={styles.imageText}>Full-Body Exercise {"\n"} <Text style={{fontSize:15, fontWeight:'300'}}>30 mins at Home</Text></Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{setVideoVisible(true), handleFetch('Cardio'), setTitle_Text('Daily Cardio')}}>
            <Image source={crossfit} resizeMode="cover" style={styles.imageStyle}/>
            <Text style={styles.imageText}>Daily Cardio {"\n"} <Text style={{fontSize:15, fontWeight:'300'}}>45 mins at Home</Text></Text>
        </TouchableOpacity>

      </View>
      <View style={styles.focusArea}>
        <Text style={styles.headerText}>Body Focus Area</Text>

        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>{setVideoVisible(true), handleFetch('Muscle Group', 'Chest Day'), setTitle_Text('Chest Day')}} >
                <Image source={chest_workout_female} resizeMode="cover" style={styles.imageStyle_row}/>
                <Text style={{color:'#FFFFFF', fontSize:20,position:'absolute', bottom:25, alignSelf:'center', fontWeight:'600'}}>Chest</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}}  onPress={()=>{setVideoVisible(true), handleFetch('Muscle Group', 'Shoulder Day'), setTitle_Text('Shoulder Day')}}>
                <Image source={shoulder_workout} resizeMode="cover" style={styles.imageStyle_row}/>
                <Text style={{color:'#FFFFFF', fontSize:20,position:'absolute', bottom:25, alignSelf:'center', fontWeight:'600'}}>Shoulder</Text>
            </TouchableOpacity>
        </View>

        <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={2}  >
            <TouchableOpacity onPress={()=>{setVideoVisible(true), handleFetch('Cardio'), setTitle_Text('Daily Cardio')}}>
                <Image source={cardio_homescreen} resizeMode="cover" style={styles.imageStyle}/>
                <Text style={styles.imageText}>Daily Cardio {"\n"} <Text style={{fontSize:15, fontWeight:'300'}}>45 mins at Home</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setVideoVisible(true), handleFetch('Full-Body'), setTitle_Text('Calisthenics')}}>
                <Image source={fullbody_workout} resizeMode="cover" style={styles.imageStyle}/>
                <Text style={styles.imageText}>Calisthenics {"\n"} <Text style={{fontSize:15, fontWeight:'300'}}>45 mins at Home</Text></Text>
            </TouchableOpacity>
        </Swiper>
        

      </View>
      
    </View>
    <VideoList visible={videoVisible} data={videoData} titile_Text={title_Text} onclose={()=> setVideoVisible(false) } />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height:900,
    backgroundColor: '#E0E0E0',
  },

  workoutPlanContainer:{
    flex:1,
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#F8F8F8',
    justifyContent:'center',
  },

  imageStyle:{
    width:'95%',
    height:150,
    marginBottom:10,
    alignSelf:'center',
    borderRadius:5,
    marginTop:20
  },

  imageText:{
    position:'absolute',
    fontSize:18,
    fontWeight:'600',
    color:'#FFFFFF',
    left:25,
    top:30
  },


  focusArea:{
    flex:1,
  },

  headerText:{
    paddingLeft:15,  
    fontSize:18, 
    paddingTop:5,
    paddingBottom:5,
    fontWeight:'600', 
    color:'#000000',
    backgroundColor:'#E0E0E0',
    width:'98%',
    alignSelf:'center',
    borderRadius:1
  },

  imageStyle_row:{
    width:'90%',
    height:150,
    marginBottom:10,
    alignSelf:'center',
    borderRadius:5,
    marginTop:20
  },


  
});
