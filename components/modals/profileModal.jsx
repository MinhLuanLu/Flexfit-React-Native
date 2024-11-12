import { useState, useContext, useEffect } from "react";
import { StyleSheet, Text,View,Modal, SafeAreaView, TextInput,TouchableOpacity, Alert } from "react-native";
import { UserInfoContext } from "../../Context/Context_UserInfo";
import { BMRContext } from "../../Context/Context_BMRCalculate";

import {SERVER_IP} from '@env';
export default function ProfileModal({change, visible,onclose, request}){
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)
    const [input, setInput] = useState()
    const {publicFullName, setPublicFullName} = useContext(UserInfoContext);
    const {publicAge, setPublicAge} = useContext(BMRContext);
    const {publicHeight, setPublicHeight} = useContext(BMRContext);
    const {publicWeight, setPublicWeight} = useContext(BMRContext);

    const [keyboardType, setKeyboardType] = useState('')

    useEffect(()=>{
        if (request == 'ChangeAge' || request == 'ChangeHeight' || request == 'ChangeWeight'){
            setKeyboardType('numeric')
        }
        else{
            setKeyboardType('')
        }
    })

    async function handleFecth(){

        const url = `${SERVER_IP}/Profile/api`;

        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'Email': publicEmail, "Request": request, "Input": input}),
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
                if(data.Name){
                    Alert.alert('Status',`${data.message}...`, [
                        {text: 'Ok', onPress:()=> {setPublicFullName(data.Name), onclose(false), setInput('')}},
                    ]);
                } 
                if(data.Age){
                    Alert.alert('Status',`${data.message}...`, [
                        {text: 'Ok', onPress:()=> {setPublicAge(data.Age) ,onclose(false), setInput('')}},
                    ]);
                }  
                if(data.Height){
                    Alert.alert('Status',`${data.message}...`, [
                        {text: 'Ok', onPress:()=> {setPublicHeight(data.Height), onclose(false), setInput('')}},
                    ]);
                }  
                if(data.Weight){
                    Alert.alert('Status',`${data.message}...`, [
                        {text: 'Ok', onPress:()=> {setPublicWeight(data.Weight), onclose(false), setInput('')}},
                    ]);
                }    
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    function handleButton(){
        if (request == 'ChangeName'){
            console.log(request)
        }
        if(request == 'ChangeAge'){
            console.log('Change Age')
        }

        handleFecth()
    }

    
    return(
        <>
            <Modal
                visible={visible}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated={true}
            >
                <View style={styles.Container}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>{onclose();}}/>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.NameInput}
                            placeholder={change}
                            value={input}
                            onChangeText={text => setInput(text)}
                            keyboardType={keyboardType}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleButton}>
                            <Text style={{textAlign:'center', color:'black'}}>Confirm Change {change}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </>
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1, 
        flexDirection:'column', 
        justifyContent:'flex-end', 
        backgroundColor:'rgba(0,0,0,0.5)',

    },

    InputContainer:{
        backgroundColor:'grey',
        height:'50%',
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },

    NameInput:{
        backgroundColor:'#E0E0E0',
        paddingBottom:15,
        paddingTop:15,
        marginTop:50,
        width:'90%',
        alignSelf:'center',
        paddingLeft:20,
        borderRadius:10
    },

    button:{
        backgroundColor:'#00BCD4',
        width:'50%',
        alignSelf:'center',
        marginTop:50,
        padding:15,
        borderRadius:25
    }
})