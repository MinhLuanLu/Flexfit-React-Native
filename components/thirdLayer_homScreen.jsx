import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image,TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Swiper from 'react-native-swiper'

const videoTutorials = require('../assets/images/videoTutorials.png');
const PT = require('../assets/images/PT.png');
const macro = require('../assets/images/macro.png');
const meal_prep = require('../assets/images/meal_prep.png');



export default function ThirdLayer() {
    const navigation = useNavigation();
    function handleVideoTutorial (){
        setTimeout(()=>{
            navigation.navigate('VideoTutorial');
        },500)
    }

    function handleCalculateMacro (){
        setTimeout(()=>{
            navigation.navigate('BMRTDEE');
        },500)
    }
    
    function handleTalkwithUse(){
        setTimeout(()=>{
            
        },500)
    }

    function handleTrackinMeal(){
        setTimeout(()=>{
            navigation.navigate('TrackingMeal');
        },500)
    }
    return(
        <View style={styles.Container}>
            <Text style={{paddingLeft:15,paddingBottom:10, fontSize:18, fontWeight:'600', marginTop:10}}>More Features</Text>
            <Swiper showsButtons={false} dotColor='#000000' activeDotStyle={{ backgroundColor: '#FFFFFF' }} autoplay={true} autoplayTimeout={3}>
                <TouchableOpacity onPress={handleVideoTutorial}>
                    <Image source={videoTutorials} resizeMode='cover' style={styles.imageStyle}/>
                    <Text style={{position:'absolute', fontSize:18, fontWeight:'600', backgroundColor:'black', alignSelf:'center', bottom:35, borderRadius:2, color:'#FFFFFF', paddingLeft:5, paddingRight:5}}>Video Tutorial</Text>

                </TouchableOpacity>

                <TouchableOpacity onPress={handleTrackinMeal} >
                    <Image source={meal_prep} resizeMode='cover' style={styles.imageStyle}/>
                    <Text style={{position:'absolute', fontSize:18, fontWeight:'600', backgroundColor:'black', alignSelf:'center', bottom:35, borderRadius:2, color:'#FFFFFF', paddingLeft:5, paddingRight:5}}>Meal Plan</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={PT} resizeMode='cover' style={styles.imageStyle}/>
                    <Text style={{position:'absolute', fontSize:18, fontWeight:'600', backgroundColor:'black', alignSelf:'center', bottom:35, borderRadius:2, color:'#FFFFFF', paddingLeft:5, paddingRight:5}}>Talk with Us</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCalculateMacro}>
                    <Image source={macro} resizeMode='cover' style={styles.imageStyle}/>
                    <Text style={{position:'absolute', fontSize:18, fontWeight:'600', backgroundColor:'black', alignSelf:'center', bottom:35, borderRadius:2, color:'#FFFFFF', paddingLeft:5, paddingRight:5}}>Calculate Macro</Text>
                </TouchableOpacity>
            </Swiper>
        </View>
    );
};



const styles = StyleSheet.create({
    Container:{
        height:210, 
        backgroundColor:'#E0E0E0'
    },

    imageStyle:{
        width:'96%',
        height:'95%',
        alignSelf:'center',
        borderRadius:3
    }
})