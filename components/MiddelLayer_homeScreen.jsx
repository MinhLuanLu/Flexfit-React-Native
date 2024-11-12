import { StyleSheet,Text,Image,TouchableOpacity,View} from "react-native";
import * as React from 'react';
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { BMRContext } from "../Context/Context_BMRCalculate";
import { useEffect , useState} from "react";
import { UserInfoContext } from "../Context/Context_UserInfo";

import Chart from "./charts/Chart";

import {SERVER_IP} from '@env'





export default function MiddelLayer(){
    const navigation = useNavigation();

    const {publicEmail, setPublicEmail} = useContext(UserInfoContext);
    const {publicProtein, setPublicProtein} = useContext(BMRContext);
    const {publicFat, setPublicFat} = useContext(BMRContext);
    const {publicCarb, setPublicCarb} = useContext(BMRContext);

    const {publicFitnessLevel, setPublicFitnessLevel} = useContext(BMRContext);
    const {publicGoal, setPublicGoal} = useContext(BMRContext)
    const {publicBMR, setPublicBMR} = useContext(BMRContext);
    const {publicTDEE, setPublicTDEE} = useContext(BMRContext);

    const [loading, setLoading] = React.useState(false);

 
    /////////////////////////////////////////////////////////////////

    const [defaultNumber, setDefaultNumber] = React.useState(1);

    const {publicTotalCalorieDidTake, setPublicTotalCalorieDidTake} = useContext(BMRContext);
    const {publicTotalCalorieDefault, setPublicTotalCalorieDefault} = useContext(BMRContext);
    const { publicCalorie, setPublicCalorie} = useContext(BMRContext)

    const {publicTotalProteinDidTake, setPublicTotalProteinDidTake} = useContext(BMRContext);
    const {publicTotalProteinDefault, setPublicTotalProteinDefault} = useContext(BMRContext)
    const [proteinPercentLeft, setProteinPrecentLeft] = useState();
    const [proteinPrecentDidTake, setProteinPrecentDidTake] = useState()


    const {publicTotalFatDidTake, setPublicTotalFatDidTake} = useContext(BMRContext);
    const {publicTotalFatDefault, setPublicTotalFatDefault} = useContext(BMRContext)
    const [fatPercentLeft, setFatPrecentLeft] = useState();
    const [fatPrecentDidTake, setFatPrecentDidTake] = useState()


    const {publicTotalCarbDidTake, setPublicTotalCarbDidTake} = useContext(BMRContext);
    const {publicTotalCarbDefault, setPublicTotalCarbDefault} = useContext(BMRContext)
    const [carbPercentLeft, setCarbPrecentLeft] = useState();
    const [carbPrecentDidTake, setCarbPrecentDidTake] = useState()

    useEffect(()=>{
        handelUpdate({"Email": publicEmail})
        if (publicCalorie === '' || publicCalorie == '0.0' || publicCalorie === '0'){
            setLoading(true)
          }
          else{
            setLoading(false);  
      
          }
    })
    // Calculate Protein
    useEffect(()=>{
        let percentProteinDidTake = (Number(publicTotalProteinDidTake) / Number(publicTotalProteinDefault)) * 100;
        let proteinPercentYouHaveLeft = 100 - percentProteinDidTake;
        //console.log(`You Did Take ${percentProteinDidTake} % from ${publicTotalProteinDefault}`)
        setProteinPrecentDidTake(percentProteinDidTake.toFixed(defaultNumber));

        //console.log(`You Have ${proteinPercentYouHaveLeft} % Protein left ...`);
        setProteinPrecentLeft(proteinPercentYouHaveLeft.toFixed(defaultNumber))
    })
  
    // Calculate Fat
    useEffect(()=>{
        let percentFatDidTake = (Number(publicTotalFatDidTake) / Number(publicTotalFatDefault)) * 100;
        let fatPrecentYouHaveLeft = 100 - percentFatDidTake;
        // console.log(`You Did Take ${percentFatDidTake} % Fat from ${publicTotalFatDefault}`)
        setFatPrecentDidTake(percentFatDidTake.toFixed(defaultNumber));

        // console.log(`You Have ${fatPrecentYouHaveLeft} % Fat left ...`);
        setFatPrecentLeft(fatPrecentYouHaveLeft.toFixed(defaultNumber))
    })

    // Calculate Carb
    useEffect(()=>{
        let percentCarbDidTake = (Number(publicTotalCarbDidTake) / Number(publicTotalCarbDefault)) * 100;
        let carbPrecentYouHaveLeft = 100 - percentCarbDidTake;
        //console.log(`You Did Take ${percentCarbDidTake} % Carb from ${publicTotalCarbDefault}`)
        setCarbPrecentDidTake(percentCarbDidTake.toFixed(defaultNumber));

        //console.log(`You Have ${carbPrecentYouHaveLeft} % Carb left ...`);
        setCarbPrecentLeft(carbPrecentYouHaveLeft.toFixed(defaultNumber))
    })
    

    function handleBreakfast(){
        console.log('beakfast press')
    }

    function handleLunch(){
        console.log('Lunch press')
    }

    function handleDinner(){
        console.log('dinner press')
    }

    function handleCalculator(){
        console.log('Calculator press..')
    }

    async function handelUpdate(data){
        const url = `${SERVER_IP}/Update_Tracking_Calorie/api`;
     
        await fetch(url, {
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
            //console.log(data.message);
    
            if(data.Update_tracking_Macro){
              // console.log(data.Update_tracking_Macro)
              setPublicTotalCalorieDidTake(data.Update_tracking_Macro["Calorie_Did_Take"]);
              setPublicCalorie(data.Update_tracking_Macro["Calorie_Daily_Left"])
              

              setPublicTotalProteinDidTake(data.Update_tracking_Macro["Protein_Did_Take"])
              setPublicProtein(data.Update_tracking_Macro["Protein_Daily_Left"])

              setPublicTotalFatDidTake(data.Update_tracking_Macro["Fat_Did_Take"]);
              setPublicFat(data.Update_tracking_Macro["Fat_Daily_Left"])

              setPublicTotalCarbDidTake(data.Update_tracking_Macro["Carb_Did_Take"])
              setPublicCarb(data.Update_tracking_Macro["Carb_Daily_Left"])
            }
            if(data.Default_Information){
                // console.log(data.Default_Information)
                setPublicTotalProteinDefault(data.Default_Information["Protein_Daily"])
                setPublicTotalFatDefault(data.Default_Information["Fat_Daily"])
                setPublicTotalCarbDefault(data.Default_Information['Carb_Daily'])
                setPublicTotalCalorieDefault(data.Default_Information["Calorie_Daily"])

                setPublicFitnessLevel(data.Default_Information["FitnessLevel"])
                setPublicGoal(data.Default_Information["Goal"])
                setPublicBMR(data.Default_Information["BMR_Calories"])
                setPublicTDEE(data.Default_Information["TDEE_Calorie"])
            }

          }
        })
        .catch(error =>{
          console.log(error);
        
        })
    }
    
    return(
        <View style={styles.swiperContainer}>
            <Swiper showsPagination={false}>
                <View  style={styles.slide1}>
                    <View style={styles.porteinContainer}>
                        <View style={{backgroundColor:'#F5F5F5', height:'95%', width:'90%', alignSelf:'center', borderRadius:10}}>
                            <View>
                                <Text style={styles.titleGram}>{publicProtein}</Text>
                                <Text style={styles.title}>Protein Intake Left</Text>
                            </View>
                            <View style={{position:'absolute', alignSelf:'center',bottom:8, height:'50%', width:'100%'}}>
                                <Chart loading={loading} inProgressColor='#9E0B0B' completedColor='#00CC81' completed={Number(proteinPrecentDidTake)} inProgress={Number(proteinPercentLeft)} result={Number(proteinPrecentDidTake)}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.fatContainer}>
                        <View style={{backgroundColor:'#F5F5F5', height:'95%', width:'90%', alignSelf:'center', borderRadius:10, position:'relative'}}>
                            <View>
                                <Text style={styles.titleGram}>{publicFat}</Text>
                                <Text style={styles.title}>Fat Intake {'\n'} Left</Text>
                            </View>

                            <View style={{position:'absolute', alignSelf:'center',bottom:8, height:'50%', width:'100%'}}>
                                <Chart loading={loading} inProgressColor='#9E0B0B' completedColor='#FFA726' inProgress={Number(fatPercentLeft)} completed={Number(fatPrecentDidTake)} result={Number(fatPrecentDidTake)}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.carbContainer}>
                        <View style={{backgroundColor:'#F5F5F5', height:'95%', width:'90%', alignSelf:'center', borderRadius:10}}>
                            <View>
                                <Text style={styles.titleGram}>{publicCarb}</Text>
                                <Text style={styles.title}>Carb Intake Left</Text>
                            </View>

                            <View style={{position:'absolute', alignSelf:'center',bottom:8, height:'50%', width:'100%'}}>
                                <Chart loading={loading} inProgressColor='#9E0B0B' completedColor='#42A5F5' inProgress={Number(carbPercentLeft)} completed={Number(carbPrecentDidTake)} result={Number(carbPrecentDidTake)}/>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.slide2}>
                    <Text>Slide 2</Text>
                </View>

            </Swiper>

        </View>
    );
}

const styles = StyleSheet.create({
    swiperContainer:{
        height:170,
        marginTop:10,
        justifyContent:'center',
       backgroundColor:'#F8F8F8'
    },
    wrapper: {},
    slide1: {
      
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'90%',
      alignSelf:'center',
      alignItems:'center',
    },

    porteinContainer:{
        flex:1,
        height:'100%',
        justifyContent:'center'
    },

    fatContainer:{
        flex:1,
        height:'100%',
        justifyContent:'center'
    },

    carbContainer:{
        flex:1,
        height:'100%',
        justifyContent:'center'
    },

    titleGram:{
        fontSize:18,
        fontWeight:'500',
        marginLeft:10,
        marginTop:10
    },

    title:{
        marginLeft:10,
        fontSize:13
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      },

})