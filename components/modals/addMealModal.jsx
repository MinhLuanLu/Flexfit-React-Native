import { input } from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Alert } from "react-native";
import { UserInfoContext } from "../../Context/Context_UserInfo";
import { useContext } from "react";
import {SERVER_IP} from '@env';
import RNPickerSelect from 'react-native-picker-select';

import { useNavigation } from "@react-navigation/native";

export default function AddMealModal({addMealVisible, onclose, mealTitle}){

    const navigation = useNavigation()

    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)
    const [mealType, setMealType] = useState()
    const [foodName, setFoodName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [calorie, setCalorie] = useState("")
    const [note, setNote] = useState("")

    const [selectedValue, setSelectedValue] = useState(null);
    const [keyboardType, setkeyboardType] = useState('numeric')
    const [warning, setWarning] = useState()




    useEffect(()=>{
        if(selectedValue == 'pieces'){
            setkeyboardType(null)
        }
        if(mealTitle !=''){
            setMealType(mealTitle)
        }
    
    }, [mealTitle])

    
    
    async function handleAddMeal(){
        const data = {
            "Email": publicEmail,
            "Meal_Type": mealType,
            "FoodName": foodName,
            "Quantity": quantity,
            "QuantityValue": selectedValue,
            "Calorie": calorie,
            "Notes": note
        }

        const url = `${SERVER_IP}/MealPlan/api`;

        if(foodName == '' || quantity == '' || selectedValue == null){
            console.log('FoodName IS Emty..')
            setWarning('Please Enter the form to add your meal to Tracking !')
        }
        else{

            setWarning('')
            await fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
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
                    setWarning('')
                    console.log(data.message)
                    Alert.alert(
                        `Success..`,
                        `Saved ${quantity} ${selectedValue} ${foodName} (${data.Calorie} Kcal) successfully..`,
                        [
                            {
                                text: 'OK',
                                onPress: () => {onclose()} // This is the callback for the button press
                            }
                        ]
                    );
                    
     
                }
                if(data.error){
                    console.log(data.error)
                    setWarning(data.error)
                }
                
            })
        }
    }
//////////////////////////////////////// Conplete the Notification when the Meal tracking is saved...
    function handleNotification(){
        
    }

    return(
        <Modal
            visible={addMealVisible}
            animationType='slide'
            statusBarTranslucent={true}
            transparent={true}
            hardwareAccelerated={true}
        >   
            <View style={{flex:1}}>
                <TouchableWithoutFeedback onPress={()=> onclose()}>
                    <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}></View>
                </TouchableWithoutFeedback>

                <View style={styles.modifiedContainer}>
                    <Text style={{padding:20, fontSize:20, fontWeight:'500', textAlign:'center'}}>{mealType}</Text>
                    <View>
                        <TextInput placeholder="Food Name" style={styles.input}
                                   value={foodName}
                                   onChangeText={text => setFoodName(text)}
                        />
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:'85%', alignSelf:'center'}}>
                            <View style={{flex:1}}>
                                <TextInput placeholder="Quantity/Pieces" style={styles.quantityInput}
                                        value={quantity}
                                        onChangeText={text => setQuantity(text)}
                                        keyboardType={keyboardType}
                                />
                            </View>
                            <View style={{ borderWidth:0.2,height:50,alignSelf:'center',borderRadius:5, flex:1,marginRight:5, marginLeft:10}}>
                                <RNPickerSelect
                                    onValueChange={(value) => setSelectedValue(value)}
                                    items={[
                                        { label: 'Gram (g)', value: 'gram' },
                                        { label: 'Pieces', value: 'pieces' },
                                        { label: 'Items', value: 'items' },
                                    ]}
                                    placeholder={{
                                        label: 'Select quantity type:',
                                        value: null, // You can use `null` or an empty string for the value
                                        color: '#000000', // Optional: Change the color of the placeholder text
                                    }}
                                    
                                />
                                
                            </View>
                        </View>
                        <TextInput placeholder="Calories (Optional)" style={styles.input}
                                   value={calorie}
                                   onChangeText={text => setCalorie(text)}
                        />
                        <TextInput placeholder="Notes (Optional)" style={styles.input}
                                    value={note}
                                    onChangeText={text => setNote(text)}
                        />

                        <Text style={{textAlign:'center', color:'red', fontSize:13, fontWeight:'500'}}>{warning}</Text>
                    </View>
                    <TouchableOpacity onPress={handleAddMeal} style={{backgroundColor:'#00BCD4', alignItems:'center', width:'80%', alignSelf:'center', height:50, justifyContent:'center', borderRadius:30, marginTop:10}}>
                        <Text style={{}}>Add Meal</Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={()=> onclose()}>
                    <View style={{flex:0.5,  backgroundColor:'rgba(0,0,0,0.5)'}}></View>
                </TouchableWithoutFeedback>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({

    modifiedContainer:{
        flex:2,
        backgroundColor:'#F8F8F8',
    },

    input:{
        borderWidth:0.2,
        height:50,
        width:'85%',
        paddingLeft:10,
        alignSelf:'center',
        borderRadius:5,
        margin:10
    },

    quantityInput:{
        borderWidth:0.2,
        height:50,
        width:'100%',
        paddingLeft:10,
        borderRadius:5,
    }
})