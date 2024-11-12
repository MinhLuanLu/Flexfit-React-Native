import { StyleSheet,Text, View, Image , TextInput,TouchableOpacity} from "react-native";
import * as React from 'react';
import { Button} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

import { useContext } from "react";
import { BMRContext } from "../Context/Context_BMRCalculate";
import { UserInfoContext } from "../Context/Context_UserInfo";

import {SERVER_IP} from '@env';
import {Notification} from '@env'

const logo = require("../assets/images/flexfit_logo.png");
const googleIcon = require('../assets/images/google-logo.png');
const facebookIcon = require('../assets/images/facebookIcon.png');
const appleIcon = require('../assets/images/appleIcon-White.png')

const meal_prep = require('../assets/images/PT.png');

export default function Login(){
    const navigation = useNavigation();

    const {publicFullName, setPublicFullName} = useContext(UserInfoContext);
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext);
    const {publicCalorie, setPublicCalorie} = useContext(BMRContext);
    const {publicProtein, setPublicProtein} = useContext(BMRContext)
    const {publicFat, setPublicFat} = useContext(BMRContext);
    const {publicCarb, setPublicCarb} = useContext(BMRContext);

    const {publicNotificationToken, setPublicNotificationToken} = useContext(UserInfoContext); // Contain Notification Token

   

    const {publicTotalProteinDefault, setPublicTotalProteinDefault} = useContext(BMRContext)
    const {publicTotalCalorieDefault, setPublicTotalCalorieDefault} = useContext(BMRContext)
    const {publicTotalFatDefault, setPublicTotalFatDefault} = useContext(BMRContext)
    const {publicTotalCarbDefault, setPublicTotalCarbDefault} = useContext(BMRContext)


    
    const {publicTotalProteinDidTake, setPublicTotalProteinDidTake} = useContext(BMRContext)
    const {publicTotalCalorieDidTake, setPublicTotalCalorieDidTake} = useContext(BMRContext)
    const {publicTotalFatDidTake, setPublicTotalFatDidTake} = useContext(BMRContext)
    const {publicTotalCarbDidTake, setPublicTotalCarbDidTake} = useContext(BMRContext)
  
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] =React.useState('');
    const [password, setPassword] =React.useState('');

    const handleLogin = () => {
        setLoading(true);
        let info = {
            "Email": email,
            "Password": password
        };
        const apiUrl = `${SERVER_IP}/Login/api`; 

        fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
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
                console.log(data.message); ///// Send Notification
                if (data.message = 'Login Success'){
                    handleSendNotification()
                }


                console.log(`Get Data From ${data.data_location}`)
                setPublicFullName(data.FullName)
                
               /////////////////////////////////////////////////// 
                if(data.data_location == "Tracking_Model"){
                    /////////////////////////////////////////////////// Maybe delete
                    setPublicTotalProteinDidTake(data.data_list["Protein_Did_Take"]);
                    setPublicTotalCalorieDidTake(data.data_list["Calorie_Did_Take"]);
                    setPublicTotalFatDidTake(data.data_list["Fat_Did_Take"]);
                    setPublicTotalCarbDidTake(data.data_list["Carb_Did_Take"])
                ///////////////////////////////////////////////////////////
                    
                    setPublicCalorie(data.data_list["Calorie_Daily_Left"])
                    setPublicProtein(data.data_list["Protein_Daily_Left"]);
                    setPublicFat(data.data_list["Fat_Daily_Left"])
                    setPublicCarb(data.data_list["Carb_Daily_Left"])      
                   
                }

                if(data.data_location == 'Information_Model'){
                    setPublicCalorie(data.data_list["Calorie_Daily"]);
                    setPublicProtein(data.data_list["Protein_Daily"]);
                    setPublicFat(data.data_list["Fat_Daily"]);
                    setPublicCarb(data.data_list["Carb_Daily"])

                }

                ///////////////////////////////////////////////////////////////////// Maybe delete
                
                if(data.Total_Marco_default){
                    setPublicTotalProteinDefault(data.Total_Marco_default["Protein_Daily"])
                    setPublicTotalCalorieDefault(data.Total_Marco_default["Calorie_Daily"]);
                    setPublicTotalCarbDefault(data.Total_Marco_default["Carb_Daily"])
                    setPublicTotalFatDefault(data.Total_Marco_default["Fat_Daily"])
                } 
                //////////////////////////////////////////////////////////

                
                setPublicEmail(data.Email);
                setTimeout(()=>{
                    handleNavigation();
                    setEmail(email);
                    setPassword('');
                    setLoading(false);
                },1000)
            }
        })
        .catch(error =>{
            console.log(error)
            setLoading(true);

            setTimeout(()=>{
                console.error('Login Error!');
                setLoading(false);
            }, 1000)
        })
        
  
    };

    const handleNavigation = () =>{
        navigation.navigate('Home')
    }

    function handleSignup (){
        navigation.navigate('SignUp')   
    }

    


    async function handleSendNotification(){
        const message = {
          to: publicNotificationToken,
          sound: 'default',
          title: "Wellcome to Flexfit app",
          body: 'Login success...'
        }
    
        await fetch(`${Notification}`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message)
        })
      }
  
    
    return(
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={meal_prep} resizeMode='cover' style={{ width: '100%', height: '100%', position: 'absolute',borderBottomRightRadius:40,
                borderBottomLeftRadius:40}} />
                <Text style={{position:'absolute', fontSize:30, fontWeight:'600', color:'#FFFFFF', backgroundColor:'rgba(0,0,0,0.5)', paddingLeft:30, paddingRight:30, bottom:40, alignSelf:'center'}}>Flexfit</Text>

            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputLogin}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='#E0E0E0'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />

                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholderTextColor='#E0E0E0'
                            
                    />
                </View>
                <TouchableOpacity>
                    <Text style={{color:'#000000', textDecorationLine: 'underline', alignSelf:'center', padding:10}}>Forgot Password?</Text>
                </TouchableOpacity>
                <Button
                    style={{
                        width:320,
                        alignSelf:'center',
                        padding:5,
                        marginTop:10,
                        borderRadius:30,
                        backgroundColor:'#FFE740'
                    }}
                    buttonColor="transparent"
                    mode="contained"
                    loading={loading}
                    onPress={handleLogin}
                    textColor="black"
                >
                    {loading ? "Logging..." : "Login"}
                </Button>

                <View style={{alignItems:'center', marginTop:0}}>
                    <TouchableOpacity onPress={handleSignup}>
                    <Text style={{color:'#E0E0E0', fontWeight:'800'}}>or continue with</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleSignup}>
                    <Text style={{color:'#000000', textAlign:'center', paddingTop:0}}>
                        Don't have an account? 
                    
                        <Text style={{color:'green', textDecorationLine:'underline'}}> Create one</Text>
        
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
   
    container: {
        display:'flex',
        flexDirection:'column',
        flex:1, 
        backgroundColor:'grey'
    },

    topContainer:{
        flex:1,
        backgroundColor:'#000000',
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50
        
    },

    inputContainer:{
        height:'60%',
        width:'98%',
        alignSelf:'center',
        backgroundColor:'#E0E0E0',
   
        borderRadius:5
    },

    text:{
        color:'#000000',
        paddingBottom:10,
    },

    inputLogin: {
        paddingHorizontal: 20,
        paddingTop:20,
    },

    input: {
        marginBottom: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
        color:'#000000',
        paddingLeft:15,
        backgroundColor:'#FFFFFF',
        minHeight:40,
        height:53
        
        
    },
})