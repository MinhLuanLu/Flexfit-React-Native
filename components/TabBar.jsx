import * as React from 'react';
import { View, TouchableOpacity, Alert, StyleSheet,Text,Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserInfoContext } from '../Context/Context_UserInfo';
import {SERVER_IP} from '@env'


const camera = require('../assets/images/camera.png');
const meal_Icon = require('../assets/images/meal_Icon.png');
const notificationIcon = require('../assets/images/notificationIcon.png');
const HomeIcon = require('../assets/images/homeIcon.png');
const search = require('../assets/images/calculator_Icon.png');




export default function TabBar({searchModalVisible}){
    const navigation = useNavigation();

    const {publicNotificationCount, setPublicNotificationCount} = useContext(UserInfoContext);
    const {publicNotification, setPublicNotification} = useContext(UserInfoContext)
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)


    function handleHistory(){
        navigation.navigate('TrackingMeal');
    }

    async function handleNotificationFetch(){
        //navigation.navigate('Notification')
        const data = {
            "Email": publicEmail,
            "Request": "Get Notification"
        }

        const url = `${SERVER_IP}/Notification/api`;
        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
            if(data.Notification){
                //console.log(data.Notification)
                setPublicNotification(data.Notification)
                navigation.navigate('Notification')
            }
        })
        .catch(error=>{
            console.log(error)
        })


    }
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Image source={HomeIcon} style={{width:25, height:25, display:'flex', marginLeft:20}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('BMRTDEE')}}>
                <Image source={search} style={{width:26, height:25, display:'flex'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CameraApp') }>
                <Image source={camera} style={{width:40, height:40, display:'flex'}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'flex-end',  position:'relative'}}  onPress={handleNotificationFetch}>
                <Image source={notificationIcon} style={{width:25, height:25, display:'flex'}}/>
                {publicNotificationCount != null && (<Text style={{color:'#9E0B0B', position:'absolute',fontSize:12, fontWeight:"800", marginTop:-3, backgroundColor:'#FFFFFF', paddingLeft:4.5, paddingRight:4.5, borderRadius:12}}>
                    {publicNotificationCount}
                </Text> 
                )} 
            </TouchableOpacity>

            <TouchableOpacity onPress={handleHistory} >
                <Image source={meal_Icon} style={{width:37, height:37, display:'flex', marginRight:20}}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:60,
        backgroundColor:'#E0EE0E',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'transparent',
        borderTopWidth:0.2,
        borderColor:'#E0E0E0'
        
    }
})