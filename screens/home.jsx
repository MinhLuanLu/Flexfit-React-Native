import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { useContext, useEffect, useState } from "react";

import { UserInfoContext } from "../Context/Context_UserInfo";
import { BMRContext } from "../Context/Context_BMRCalculate";
import NoDataModal from "../components/modals/noData_Modal";
import CalorieModal from "../components/modals/calorieModal";


import Header from '../components/header';
import TopLayer from '../components/TopLayer_HomeScreen';
import MiddelLayer from '../components/MiddelLayer_homeScreen';
import ThirdLayer from '../components/thirdLayer_homScreen';
import FourthLayer from '../components/fourthLayer_homeScreen';
import TabBar from '../components/TabBar';

import {Morning} from '@env';
import {Midday} from '@env';
import {Afternoon} from '@env';
import {Evening} from '@env';
import {Notification} from '@env';

import {SERVER_IP} from '@env';

import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();
    const { publicTotalCalorieDefault, setPublicTotalCalorieDefault } = useContext(BMRContext);
    const { publicTotalCalorieDidTake, setPublicTotalCalorieDidTake } = useContext(BMRContext);

    const {publicNotificationCount, setPublicNotificationCount} = useContext(UserInfoContext)
    const {publicNotificationToken, setPublicNotificationToken} = useContext(UserInfoContext); // Contain Notification Token
    
    const [displayCalorieModal, setDisplayCalorieModal] = useState(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false);

    const { publicCalorie, setPublicCalorie } = useContext(BMRContext);
    const [displayCalculateMacro, setDisplayCalculateMacro] = useState(false);

    const [calorieLeft, setCalorieLeft] = useState(Number(publicTotalCalorieDefault) - Number(publicTotalCalorieDidTake));

    const [logged, setLogged] = useState(false); //
    const [breakfast, setBreakFast] = useState(`BreakFast Time: You Have ${calorieLeft} for Today.`)
    const [lunch, setLunch] = useState(`Lunch Time: You still have ${calorieLeft} left for Today. `)
    const [dinner, setDennier] = useState(`Dinner Time: You still have ${calorieLeft} left for Today. `)
    const [calorieleft, setClorieLeft] = useState(Number(publicTotalCalorieDefault) - Number(publicTotalCalorieDidTake))

    const [sendat, setSendAt] = useState();
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)

    const {updateData, setUpdateData} = useContext(UserInfoContext)
    
    /// Update all data when you retuen to the home screen
    useEffect(()=>{
        if(updateData == 'readUpdate'){
            console.log('')
        }
        setUpdateData('')

    })

    useEffect(() => {
        if (publicCalorie === '' || publicCalorie === '0.0' || publicCalorie === '0') {
            const timer = setTimeout(() => {
                setDisplayCalculateMacro(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [publicCalorie]);

    useEffect(() => {
        
        const checkTime = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds(); // Get current seconds


            const today = new Date();
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayName = days[today.getDay()];

            // Get the month, day, and year
            const month = (today.getMonth() + 1).toString().padStart(2, '0');  // Month is zero-indexed
            const day = today.getDate().toString().padStart(2, '0');
            const year = today.getFullYear();

            // Combine everything into the desired format
            const formattedDate = `${dayName}, ${month}/${day}/${year}`;

            setSendAt(formattedDate)
            
            // Convert to 12-hour format
            const isAM = hours < 12;
            hours = hours % 12 || 12; // Convert to 12-hour format, handle 0 as 12
            
            // Format minutes and seconds to be always 2 digits
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            const currentTime = `${hours}:${minutes}:${seconds}:${isAM ? 'AM' : 'PM'}`;

            //console.log('Current Time:', currentTime); 

            if (currentTime.startsWith(`${Morning}`) && !logged) { // Use startsWith to check seconds
                handleGetCalorieLeft()
                setLogged(true); // Mark lunch as logged
                Alert.alert('Reminder...',`${breakfast}`, [
                    {text: 'Ok', onPress:()=> handleSendNotification(breakfast)},
                ]);
            }

            if (currentTime.startsWith(`${Midday}`) && !logged) { // Use startsWith to check seconds
                handleGetCalorieLeft()
                setLogged(true); // Mark lunch as logged
                Alert.alert('Reminder...',`${lunch}`, [
                    {text: 'Ok', onPress:()=> handleSendNotification(lunch)},
                ]);
            }

            if (currentTime.startsWith(`${Afternoon}`) && !logged) { // Use startsWith to check seconds
                handleGetCalorieLeft()
                setLogged(true); // Mark lunch as logged
                Alert.alert('Reminder...',`You still have ${calorieleft}`, [
                    {text: 'Ok', onPress:()=> handleSendNotification(`You still have ${calorieleft}`)},
                ]);
            }

            if (currentTime.startsWith(`${Evening}`) && !logged) { // Use startsWith to check seconds
                handleGetCalorieLeft()
                setLogged(true); // Mark lunch as logged
                Alert.alert('Reminder...',`${dinner}`, [
                    {text: 'Ok', onPress:()=> handleSendNotification(dinner)},
                ]);
            }
            
        };

        // Check every second
        const timerId = setInterval(checkTime, 1000);

        if(logged ==true){
            setLogged(false)
        }

        return () => clearInterval(timerId);
    }, [logged]) 


    async function handleSendNotification(reminder){
        setPublicNotificationCount(publicNotificationCount + 1)
        const message = {
          to: publicNotificationToken,
          sound: 'default',
          title: "Reminder",
          body: reminder
        }
    
        await fetch(`${Notification}`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message)
        })
      }


    async function handleGetCalorieLeft(){
        const data = {
            "Email": publicEmail,
            "Request": "Get-CalorieLeft"
        }

        const url = `${SERVER_IP}/GetCalorieLeft/api`;

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
        .then(data=>{
            if(data.message){
                console.log(data.message)
                setCalorieLeft(data.CalorieLeft)
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }


    // Render CalorieModal if visible
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollViewContent}>
                <Header />
                <View style={{marginTop:10}}><TopLayer displayCalorieModal={() => {setDisplayCalorieModal(true)}} /></View>
                <MiddelLayer />
                <ThirdLayer />
                <FourthLayer/>
            </ScrollView>
            <View style={styles.fixedTabBar}>
                <TabBar searchModalVisible={() => setSearchModalVisible(true)} />
            </View>

            <CalorieModal visible={displayCalorieModal} onClose={()=>{setDisplayCalorieModal(false)}}/>
            
            <NoDataModal
                visible={displayCalculateMacro}
                onClose={() => setDisplayCalculateMacro(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0'
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    fixedTabBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor:'#E0E0E0'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
    
});

export default Home;
