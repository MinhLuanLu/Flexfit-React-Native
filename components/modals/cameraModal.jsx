import { StyleSheet,Modal,ActivityIndicator,Text,View,TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import MacroTable from '../macroTable';

import { useContext } from "react";
import { BMRContext } from "../../Context/Context_BMRCalculate";
import { UserInfoContext } from "../../Context/Context_UserInfo";


import {SERVER_IP} from '@env'



export default function CameraModal({visible,imageURL,objectName, protein, fat, carb, calorie,quantity, goback, foodDetection, goHome}){

   
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext);
    const {publicCalorie, setPublicCalorie} = useContext(BMRContext);
    const {publicProtein, setPublicProtein} = useContext(BMRContext);
    const {publicFat, setPublicFat} = useContext(BMRContext);
    const {publicCarb, setPublicCarb} = useContext(BMRContext)

    const {publicObjectCalorie, setPublicObjectCalorie} = useContext(BMRContext);
    const {publicObjectProtein, setPublicObjectProtein} = useContext(BMRContext);
    const {publicObjectFat, setpublicObjectFat} = useContext(BMRContext);
    const {publicObjectCarb, setPublicObjectCarb} = useContext(BMRContext);


    const {publicTotalProteinDidTake, setPublicTotalProteinDidTake} = useContext(BMRContext)
    const { publicTotalCalorieDidTake, setPublicTotalCalorieDidTake} = useContext(BMRContext)
    const {publicTotalFatDidTake, setPublicTotalFatDidTake} = useContext(BMRContext)
    const {publicTotalCarbDidTake, setPublicTotalCarbDidTake} = useContext(BMRContext)

    const {publicTotalProteinDefault, setPublicTotalProteinDefault} = useContext(BMRContext)
    const {publicTotalCalorieDefault, setPublicTotalCalorieDefault} = useContext(BMRContext)
    const {publicTotalFatDefault, setPublicTotalFatDefault} = useContext(BMRContext)
    const {publicTotalCarbDefault, setPublicTotalCarbDefault} = useContext(BMRContext)

    const {publicCaloriePercentLeft, setPublicCaloriePercentLeft } =  useContext(BMRContext)

    
    

    function handelBack(){
     
        goback();
    }

    function handleAddMacro(){
        // Convert Object's Macro to Number
        let objectCalories = Number(calorie);
        let objectProtein = Number(protein);
        let objectFat = Number(fat);
        let objectCarb = Number(carb);
        setPublicObjectCalorie(objectCalories);
        setPublicObjectProtein(objectProtein);
        setpublicObjectFat(objectFat);
        setPublicObjectCarb(objectCarb);

        ///////////////////////////////////////////////////////////////////

        let totalCalorieDidTake = Number(publicTotalCalorieDidTake) + Number(objectCalories) // Your Total Calories
        //console.log(`Total Calorie Did Take:  ${publicTotalCalorieDidTake} + ${objectCalories} = ${totalCalorieDidTake}`)
        setPublicTotalCalorieDidTake(totalCalorieDidTake) /// set to public Tatal Calorie to use for the next time 

        let caloriePercentYouDidTake = (Number(totalCalorieDidTake) / Number(publicTotalCalorieDefault)) * 100; //Percent you did take
        //console.log(`Percent Did Take: ${totalCalorieDidTake} / ${publicCalorie} * 100 = ${caloriePercentYouDidTake}`);

        let CaloriePercentYouHaveLeft = 100 - caloriePercentYouDidTake; //Percent you have left
        //console.log(CaloriePercentYouHaveLeft)
        setPublicCaloriePercentLeft(CaloriePercentYouHaveLeft.toFixed(1))

        let calorieYouHaveLeft = Number(publicTotalCalorieDefault) - totalCalorieDidTake // Calorie you have left
        //console.log(`${publicTotalCalorieDefault} - ${totalCalorieDidTake}`)
        //console.log(`You have ${calorieYouHaveLeft} Kcal Left`)
        setPublicCalorie(calorieYouHaveLeft.toFixed(1))

////////////////////////////////////////////////////////////////////////////////////////////////////////
        let totalProteinDidTake = Number(publicTotalProteinDidTake) + Number(objectProtein);
        //console.log(`Total Protein Did Take:  ${publicTotalProteinDidTake} + ${objectProtein} = ${totalProteinDidTake}`)
        setPublicTotalProteinDidTake(totalProteinDidTake)

        let proteinPercentDidTake = (Number(totalProteinDidTake) / Number(publicTotalProteinDefault)) * 100;

        let ProteinPercentYouHaveLeft = 100 - Number(proteinPercentDidTake)

        let proteinYouHaveLeft = Number(publicTotalProteinDefault) - Number(totalProteinDidTake);
        //console.log(`Protein You have Left: ${proteinYouHaveLeft}`)
        setPublicProtein(proteinYouHaveLeft.toFixed(1))

///////////////////////////////////////////////////////////////////////////////////////
        let totalFatDidTake = Number(publicTotalFatDidTake) + Number(objectFat);
        //console.log(`Total Fat Did Take:  ${publicTotalFatDidTake} + ${objectFat} = ${totalFatDidTake}`)
        setPublicTotalFatDidTake(totalFatDidTake)

        let FatPercentDidTake = (Number(totalFatDidTake) / Number(publicTotalFatDefault) * 100);
        //console.log(`Fat Percent You did take : ${totalFatDidTake} / ${publicTotalFatDefault} * 100 = ${FatPercentDidTake}`)
        let FatPercentYouHaveLeft = 100 - Number(FatPercentDidTake);
        //console.log(`You have ${FatPercentYouHaveLeft} % Fat Left`)

        let FatYouHaveLeft = Number(publicTotalFatDefault) - Number(totalFatDidTake)
        //console.log(`Fat You have Left: ${FatYouHaveLeft}`)
        setPublicFat(FatYouHaveLeft.toFixed(1))
       
////////////////////////////////////////////////////////////////////
        let totalCarbDidTake = Number(publicTotalCarbDidTake) + Number(objectCarb);
        //console.log(`Total Carb did take : ${publicTotalCarbDidTake} + ${objectCarb} = ${totalCarbDidTake}`)
        setPublicTotalCarbDidTake(totalCarbDidTake)

        let carbPercentDidTake = (Number(totalCarbDidTake) / Number(publicTotalCarbDefault)) * 100;
        //console.log(`Carb Percent You did take : ${totalCarbDidTake} / ${publicTotalCarbDefault} * 100 = ${carbPercentDidTake}`)

        let carPercentHaveLeft = 100 - Number(carbPercentDidTake);

        let CarbYouHaveLeft = Number(publicTotalCarbDefault) - Number(totalCarbDidTake)
        //console.log(`CarbYou Have Left: ${CarbYouHaveLeft}`)
        setPublicCarb(CarbYouHaveLeft.toFixed(1))

       
        
        
        ////////////////////////////////////////////////////////////////
        // Notice Convert them to toFix
        
        let data = {
            "Email": publicEmail,
            "Update_Status": true,
            "Calorie_Did_Take": totalCalorieDidTake,
            "Protein_Did_Take": totalProteinDidTake,
            "Fat_Did_Take": totalFatDidTake,
            "Carb_Did_Take": totalCarbDidTake,
            "Calorie_Daily_Left": calorieYouHaveLeft,
            "Protein_Daily_Left": proteinYouHaveLeft,
            "Fat_Daily_Left": FatYouHaveLeft,
            "Carb_Daily_Left": CarbYouHaveLeft
        }

        FetchAPI(data)

        goHome();
    }

    const url = `${SERVER_IP}/Tracking_Calorie/api`;
    console.log(url)
    async function FetchAPI(data){
        await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(res =>{
            if(res.ok){
                return res.json()
            }
            if(res === 400){
                return res.json();
            }
        })
        .then(data =>{
            if(data.message){
                
            }
        })
        
        .catch(error =>{
            console.log(error)
        })
    }
    
    return(
        <Modal 
                visible={visible}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated ={true}
        >
            <View style={styles.Container}>
            <View style={styles.imageContainer}>
            
                <Image style={styles.images} source={{uri: imageURL}}/>
            
            </View>
                {foodDetection === true ?(
                    <View style={styles.infoContainer}>
                        <View style={{flex:1,justifyContent:'center', marginTop:30}}>
                            <MacroTable objectName={objectName} protein={protein} fat={fat} carb={carb} calorie={calorie} quantity={quantity}/>
                        </View>
                        <View style={{flex:1, alignItems:'center'}}>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddMacro}>
                                <Text>Add to your daily calories</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handelBack}>
                                <Text style={{textDecorationLine:'underline', fontSize:15, fontWeight:'500', marginTop:15}}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                :
                (
                    <View style={styles.infoContainerNotFood}>
                        <Text style={{flex:1, fontSize:25,marginLeft:20, marginTop:50, fontWeight:400}}>ObjectName: <Text style={{fontSize:18, fontWeight:'500', color:'red'}}> {objectName}</Text></Text>
                        <Text style={{color:'red'}}>The object is not food; our system couldn't identify the macros of the object.!!!</Text>

                        <View style={{flex:1, alignItems:'center'}}>
                            <TouchableOpacity onPress={handelBack}>
                                <Text style={{textDecorationLine:'underline', fontSize:15, fontWeight:'500', marginTop:15}}>Go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#000000',
    },

    imageContainer:{
        flex:1,
        backgroundColor:'#00000',
        justifyContent:'center',
        alignItems:'center',
       
        
        
    },

    images:{
        resizeMode:'contain',
        width:'80%', 
        height:'80%',
        
    },

    infoContainer:{
        flex:2,
        backgroundColor:'#E0E0E0',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
    },

    addButton:{
        backgroundColor:'#00BCD4',
        padding:15,
        width:'80%',
        borderRadius:30,
        fontWeight:'500',
        fontSize:15,
        alignItems:'center'
        
    },

    infoContainerNotFood:{
        flex:2,
        backgroundColor:'#E0E0E0',
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        alignItems:'center',
        
    }

})