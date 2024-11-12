import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Alert, SafeAreaView, TouchableOpacity,Platform } from 'react-native';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserInfoContext } from '../Context/Context_UserInfo';
import { useContext } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import StartScreenTopLayer from '../components/startingScreen_Toplayer'
import {Notification_ProjectID} from '@env'


const rightArrow = require("../assets/images/right-arrow.png");


export default function Launch_screen() {
  
  const navigation = useNavigation();
  const {publicNotificationToken, setPublicNotificationToken} = useContext(UserInfoContext);



  /////////////////////////////////////////////////////////////////////////////////////////////
    //Notification:

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(()=>{
        registerForPushNotificationsAsync().then(token => {
        setExpoPushToken(token);
        setPublicNotificationToken(token)

        //console.log("Token: ", publicNotificationToken)
        }).catch(error => console.log(error))

    },[])


    async function registerForPushNotificationsAsync() {
        let token;
    
        if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        };
    
        if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        // EAS projectId is used here.
        try {
            const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
            throw new Error('Project ID not found');
            }
            token = (
            await Notifications.getExpoPushTokenAsync({
                projectId:`${Notification_ProjectID}` //replace you Project ID here
            })
            ).data;
            //console.log(token);
            //console.log(`Token: ${publicNotificationToken}`)
            setPublicNotificationToken(token)
        } catch (e) {
            token = `${e}`;
        }
        } else {
        alert('Must use physical device for Push Notifications');
        }
    
        return token;
    }

  function handleLoginwithFlexfit (){
    navigation.navigate("Login")
  }


  function handleSignup (){
    navigation.navigate("SignUp")
  }

  
  return (
    <>
      <SafeAreaView style={styles.container}>

        
        <View style={styles.layer_top}>
          <View>
              <StartScreenTopLayer/>
          </View>
        </View>

        <View style={styles.layer_middle}>
          <Text style={{marginTop:50, fontWeight:"bold", fontSize:30, color:'#000000'}}>Welcome to the FlexFit</Text>
          <Text style={{marginBottom:5, fontWeight:"bold", fontSize:30, color:'#000000'}}>App</Text>
          <Text style={{color: "#000000"}}>The Path To Wellness</Text>
        </View>

        <View style={styles.layer_bottom}>
          
          <View style={{paddingTop:10, alignItems:'center'}}>
            <TouchableOpacity onPress={handleLoginwithFlexfit} style={styles.startButton}>
              <Text style={{textAlign:'center', fontWeight:'800', fontSize:15}}>Get Started</Text>
              <Image source={rightArrow} style={{width:18, height:18, position:'absolute', bottom:17, right:35, }}/>
              <Image source={rightArrow} style={{width:18, height:18, position:'absolute', bottom:17, right:25}}/>
              <Image source={rightArrow} style={{width:18, height:18, position:'absolute', bottom:17, right:15}}/>
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'center'}}>
            <Text style={{color:'#000000', paddingTop:10}}>Not a member?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={{color:'black', fontWeight:'800', fontSize:15, color:'#000000'}}>Sign Up</Text>
            </TouchableOpacity>
           
          </View>

        </View>
      </SafeAreaView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8F8F8',
    marginTop:-20
  },

  layer_top:{
    flex:2, 
    alignItems:"center",
    backgroundColor:'white',
    opacity:0.8
  },

  layer_middle:{
    flex:0,
    alignItems:"center",
  },

  layer_bottom:{
    flex:1
  },

  startButton:{
    backgroundColor:"#FFE740",
    width:'60%',
    height:50,
    justifyContent:'center',
    borderRadius:25,
    borderWidth:0.2,
    borderColor:'#000000'
  }
})
