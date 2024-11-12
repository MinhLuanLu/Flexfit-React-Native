import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image,TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Swiper from 'react-native-swiper'

const futureBackground = require("../assets/images/startingScreen_background.jpg");
const getStrong_background = require("../assets/images/getStrong_background.jpg");
const gymCenter_background = require('../assets/images/gymCenter_background.jpg');



export default function StartScreenTopLayer() {
    
    return(
     
        <View style={styles.swiperContainer}>
            <Swiper style={styles.wrapper} showsButtons={false} dotColor='#FFFF'activeDotColor='#FFF085' autoplay={true} autoplayTimeout={5}>
                <View style={styles.slide1}>
                    <Image source={gymCenter_background} style={{resizeMode:'repeat'}}/>
                    <Text style={{color:'#FFFFFF', position:'absolute', fontSize:50,bottom:40, alignSelf:'center',fontWeight: 'bold',textShadowColor:'black', textShadowOffset:{width:-2,height:2}, textShadowRadius:1}}>Workout</Text>
                </View>

                <View style={styles.slide2}>
                    <Image source={futureBackground} style={{resizeMode:'repeat', position:'relative'}}/>
                    <Text style={{color:'#FFFFFF', position:'absolute', fontSize:50,bottom:40, alignSelf:'center',fontWeight: 'bold',textShadowColor:'black', textShadowOffset:{width:-2,height:2}, textShadowRadius:1}}>Future</Text>
                </View>

                <View style={styles.slide3}>
                    <Image source={getStrong_background} style={{resizeMode:'repeat'}}/>
                    <Text style={{color:'#FFFFFF', position:'absolute', fontSize:50,bottom:40, alignSelf:'center',fontWeight: 'bold',textShadowColor:'black', textShadowOffset:{width:-2,height:2}, textShadowRadius:1}}>Get stronger</Text>
                </View>

                    
            </Swiper>
        </View>
            
    
    );
};



const styles = StyleSheet.create({
    swiperContainer:{
        flex:1
    },
    wrapper: {},
    slide1: {
      flex: 1,
      
    },

    slide2: {
        flex: 1,
        
      },

      slide3: {
        flex: 1,
        
      },

      
})