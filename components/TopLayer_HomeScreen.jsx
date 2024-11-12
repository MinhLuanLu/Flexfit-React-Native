import { useState, useEffect } from "react";
import { StyleSheet,View,Text, SafeAreaView } from "react-native";
import React from "react";
import { BMRContext } from "../Context/Context_BMRCalculate";
import { useContext } from "react";
import CalorieChart from "./charts/calorieChart";

import { UserInfoContext } from "../Context/Context_UserInfo";


export default function TopLayer({displayCalorieModal}){

    const [defaultNumber, setDefaultNumber] = React.useState(1);
    const { publicCalorie, setPublicCalorie} = useContext(BMRContext)

    
    const { publicTotalCalorieDidTake, setPublicTotalCalorieDidTake} = useContext(BMRContext)
    const {publicTotalCalorieDefault, setPublicTotalCalorieDefault} = useContext(BMRContext)

    const [caloriePercentLeft, setCaloriePrecentLeft] = useState();
    const [caloriePrecentDidTake, setCaloriePrecentDidTake] = useState()

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if (publicCalorie === '' || publicCalorie == '0.0' || publicCalorie === '0'){
          setLoading(true)        
        }
        else{
          setLoading(false);  
    
        }
    
      })

    useEffect(() =>{
        let percentDidTake = (Number(publicTotalCalorieDidTake) / publicTotalCalorieDefault) * 100;
        let percentYouHaveLeft = 100 - percentDidTake;
        setCaloriePrecentDidTake(percentYouHaveLeft)

        //console.log(`You Have ${percentYouHaveLeft} % Calorie left ....`)
        setCaloriePrecentLeft(percentYouHaveLeft.toFixed(defaultNumber))
    })

   
    return(
        
        <View style={styles.container}>
            
            <View style={{display:'flex', flexDirection:'row', flex:1, justifyContent:'center'}}>
                <View style={{width:'50%'}}>
                    <CalorieChart displayCalorieModal={displayCalorieModal} inProgressCalories={Number(publicCalorie)} completedCalories={Number(publicTotalCalorieDidTake)} result={Number(publicCalorie)} loading={loading}/>
                </View>
                <View style={{alignSelf:'center', paddingLeft:25, width:'50%'}}>
                    <Text style={{color:'#000000', fontSize:23, fontWeight:'700'}}>Daily Calorie{'\n'}Goal</Text>
                    <Text style={{color:'#000000', fontSize:15}}>Track Calorie Intake{'\n'}<Text style={{color:'#00CC81'}}>{Number(caloriePercentLeft)}%</Text> left </Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:200,
        backgroundColor:'#F5F5F5',
        width:'95%',
        alignSelf:'center',
        borderRadius:8,
    }
})