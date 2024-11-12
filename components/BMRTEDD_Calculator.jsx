
import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { BMRContext } from '../Context/Context_BMRCalculate';
import {UserInfoContext} from '../Context/Context_UserInfo'
import { useState, useContext } from 'react';

import{SERVER_IP} from '@env';
import {Notification} from '@env'





export default function BMRTEDD_Calculator({fitnessLevel, goal, activeLevel}) {

  const {publicEmail, setPublicEmail} = useContext(UserInfoContext)

  const {publicAge, setPublicAge} =useContext(BMRContext);
  const {publicHeight, setPublicHeight} =useContext(BMRContext);
  const {publicWeight, setPublicWeight} =useContext(BMRContext);
  const {publicFatPrecent, setPublicFatPrecent} = useContext(BMRContext);


  

  const {publicBMR, setPublicBMR} = useContext(BMRContext);
  const {publicTDEE, setPublicTDEE} = useContext(BMRContext);

  const [checked, setChecked] = useState('Male');
  const [calculating, setCalculating] = useState(false);

  const [age, setAge] = useState(publicAge);
  const [weight, setWeight] = useState(publicWeight);
  const [height, setHeight] = useState(publicHeight);
  const [fat, setFat] = useState(publicFatPrecent);

  const {publicNotificationToken, setPublicNotificationToken} = useContext(UserInfoContext);

  const navigation = useNavigation();

  function handleMaleCheck(){
    setChecked('Male')
  }

  function handleFemaleCheck(){
    setChecked('Female')
  }

  function handleCalculating(){
    setCalculating(true);
    let data = {
      "user": publicEmail,
      "Age": Number(age),
      "Gender": checked,
      "Weight": Number(weight),
      "Height": Number(height),
      "Fat": Number(fat),
      "Fitness Level": fitnessLevel,  
      "Goal": goal,
      "Active Level": activeLevel                  
    };
    handelFetch(data)
    
  }
  
  async function handelFetch(data){
    
      await fetch(`${SERVER_IP}/Information/api`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(res =>{
        if (res.ok){
          return res.json();
        }
        if(res === 400){
          return res.json();
        }
      })
      .then(data =>{
        if(data.message){
          console.log(data.message);

          handelUpdateTrackingData({"Email": publicEmail}) //Update the Macro just Calculate
          
          setPublicBMR(data.user_Information['BMR_Calories']);
          setPublicTDEE(data.user_Information['TDEE_Calorie']);

          setTimeout(() => {
            setCalculating(false);
            setPublicAge(age);
            setPublicHeight(height);
            setPublicWeight(weight);
            navigation.navigate('Home');
            handleSendNotification()
          }, 2000);
        }
      })
      .catch(error =>{
        console.log(error);
        setTimeout(() => {
          setCalculating(false);
          //console.log(data);
          setPublicAge(age);
          setPublicHeight(height);
          setPublicWeight(weight);
          navigation.navigate('Home');
        }, 2000);
      })
  }

  async function handelUpdateTrackingData(data){
    
    await fetch(`${SERVER_IP}/Update_Tracking_Calorie/api`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res =>{
      if (res.ok){
        return res.json();
      }
      if(res === 400){
        return res.json();
      }
    })
    .then(data =>{
      if(data.message){
        console.log(data.message);

        if(data.Update_tracking_Macro){
          console.log(data.Update_tracking_Macro)
        }
      }
    })
    .catch(error =>{
      console.log(error);
    
    })
}

async function handleSendNotification(){
  const message = {
    to: publicNotificationToken,
    sound: 'default',
    title: "Flexfit",
    body: 'Update Tracking Macro success...'
  }

  await fetch(`${Notification}`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })
}
  
  return (
    <View style={styles.container}>
       
          <View style={{padding:20, paddingBottom:40}}>
            <Text style={{color:'#000000', fontSize:25, fontWeight:'800', textAlign:'center', borderBottomWidth:0.5, paddingBottom:10}}>Infomation</Text>
          </View>
          
          <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <View>
                  <Text style={{color:'#E0E0E0', paddingRight:50}} >Male</Text>
                  <RadioButton
                    value="Male"
                    status={checked === 'Male' ? 'checked' : 'unchecked'}
                    onPress={handleMaleCheck}
                    color="#00BCD4"
                    uncheckedColor='#000000'
                  />
                </View>
                <View>
                  <Text style={{color:'#E0E0E0'}}>Female</Text>
                  <RadioButton 
                    value='Female'
                    status={checked === 'Female' ? 'checked' : 'unchecked'}
                    onPress={handleFemaleCheck}
                    color="#00BCD4"
                    uncheckedColor='#000000'
                  />
                </View>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:10}}>
              <TextInput onChangeText={text => setAge(text)} keyboardType='numeric' placeholder='Age' placeholderTextColor='#00000' style={{borderWidth:0.5, borderColor:'#000000', borderRadius:3, padding:15, width:150, color:'#000000', fontSize:15, fontWeight:'600', backgroundColor:'#F8F8F8'}}/>
              <View style={{display:'flex', flexDirection:'row'}}>
                <TextInput onChangeText={text => setWeight(text)} keyboardType='numeric' placeholder='Weight' placeholderTextColor='#000000' style={{borderWidth:0.5, backgroundColor:'#F8F8F8',borderColor:'#000000', borderRadius:3, padding:15, width:150, color:'#000000', fontSize:15, fontWeight:'600', position:'relative'}}/>
                <Text style={{position:'absolute',alignSelf:'center', right:25, color:'#000000', fontSize:18, opacity:0.8}}>Kg</Text>
              </View>
          </View>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:10}}>
              <View style={{display:'flex', flexDirection:'row'}}>
                <TextInput onChangeText={text => setHeight(text)} keyboardType='numeric' placeholder='Height' placeholderTextColor='#000000' style={{borderWidth:0.5, borderColor:'#000000', borderRadius:3, padding:15, width:150, color:'#000000',fontSize:15, fontWeight:'600', position:'relative', backgroundColor:'#F8F8F8'}}/>
                <Text style={{position:'absolute',alignSelf:'center', right:25, color:'#000000', fontSize:18, opacity:0.8}}>Cm</Text>
              </View>
              <View style={{display:'flex', flexDirection:'row'}}>
                <TextInput onChangeText={text => setFat(text)} keyboardType='numeric' placeholder='Fat' placeholderTextColor='#000000' style={{borderWidth:0.5, borderColor:'#000000', borderRadius:3, padding:15, width:150, color:'#000000',fontSize:15, fontWeight:'600', backgroundColor:'#F8F8F8',position:'relative'}}/>
                <Text style={{position:'absolute',alignSelf:'center', right:25, color:'#000000', fontSize:18, opacity:0.8}}>%</Text>
              </View>
              
          </View>
          <View>
              <Text style={{color:'red',padding:10, fontSize:13, textAlign:'center'}}>! Fat percentage is not necessary to be given.</Text>
          </View>
          <TouchableOpacity>
              <Button loading={calculating} onPress={handleCalculating} textColor='#FFFFFF'  style={{backgroundColor:'#00BCD4',borderRadius:30, width:300, alignSelf:'center', marginTop:20, padding:8}} >{calculating ? 'Calculating' : "Calculate !"}</Button>
          </TouchableOpacity>
          
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
