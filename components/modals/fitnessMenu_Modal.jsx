import { StyleSheet, View, TouchableOpacity, Text, Image, Modal, ScrollView } from "react-native";
import { useState, useEffect } from "react";
const chest_workout = require('../../assets/images/chest_workout.png')
const shoulder_workout = require('../../assets/images/shoulder_workout.png')
const arms_workout = require('../../assets/images/arms_workout.png')
const back_workout = require('../../assets/images/back_workout.png')
const legs_workout = require('../../assets/images/legs_workout.png')
import VideoList from "./videoList_Modal";

import {SERVER_IP} from '@env'


export default function FitnessMenu_Modal({visible, onclose}){

    const [visibleVideoList, setVisibleVideoList] = useState(false)
    const [videoList, setVideoList] = useState([])

 
    async function handleFetch(workout_day){
        let data = {
            "Categogy": "Muscle Group",
            "Video_Type": workout_day
        }

        setVisibleVideoList(true)

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
                //console.log(data.message)
                setVideoList(data.Video_data)
            }
        })
    }

        


    return(
        <View style={styles.Container}>
            <Modal
                visible={visible}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated={true}
            >

            <TouchableOpacity style={styles.layer1} onPress={()=> onclose()}>
                <Text style={{fontSize:20, fontWeight:'600',alignSelf:'center', position:'absolute', bottom:50, color:'#FFFFFF'}}>Choose Muscle Group</Text>
            </TouchableOpacity>
            <View style={styles.muscleGroupContainer}>
                <ScrollView>
                    <TouchableOpacity style={styles.ImageContainer} onPress={()=>{handleFetch('Chest Day')}}>
                        <Image source={chest_workout} resizeMode="cover" style={styles.image_style}/>
                        <Text style={styles.text}>Chest</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ImageContainer} onPress={()=>{handleFetch('Shoulder Day')}}>
                        <Image source={shoulder_workout} resizeMode="cover" style={styles.image_style}/>
                        <Text style={styles.text}>Shoulder</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ImageContainer} onPress={()=>{handleFetch('Arms Day')}}>
                        <Image source={arms_workout} resizeMode="cover" style={styles.image_style}/>
                        <Text style={styles.text}>Arms</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ImageContainer} onPress={()=>{handleFetch('Back Day')}}>
                        <Image source={back_workout} resizeMode="cover" style={styles.image_style}/>
                        <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.ImageContainer} onPress={()=>{handleFetch('Leg Day')}}>
                        <Image source={legs_workout} resizeMode="cover" style={styles.image_style}/>
                        <Text style={styles.text}>Legs</Text>
                    </TouchableOpacity>

                </ScrollView>
                
            </View>
                
            </Modal>
            <VideoList visible={visibleVideoList} data={videoList} onclose={()=> setVisibleVideoList(false)}/>
        </View>
    )
}

const styles = StyleSheet.create({

    Container:{
        display:'flex',
        flexDirection:'column',
    },


    layer1:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
    },

    muscleGroupContainer:{
        backgroundColor:'grey',
        flex:2,
        display:'flex',
        flexDirection:'coumn',
        justifyContent:'space-between',
        borderRadius:5
        
    },


    ImageContainer:{
        height:150,
        justifyContent:'center',
        alignItems:'center',
        width:'95%',
        alignSelf:'center',
    },

    image_style:{
        width:'100%',
        height:'90%',
        borderRadius:5
        
    },

    text:{
        position:'absolute',
        color:'#000000',
        backgroundColor:'#E0E0E0',
        padding:5,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:2,
        bottom: 25
    }
})