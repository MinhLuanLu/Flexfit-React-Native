import {React, useEffect} from 'react'
import { StyleSheet,Text,View, Button,TouchableOpacity,Image, Alert } from 'react-native';

import { BMRContext } from '../Context/Context_BMRCalculate';
import { UserInfoContext } from '../Context/Context_UserInfo';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import ProfileModal from '../components/modals/profileModal';

const avatarBlack_ICon = require('../assets/images/avatarBlack_ICon.png');
const rightArrow =require('../assets/images/rightWhite-arrow.png');
const nameChangeIcon = require('../assets/images/nameChangeIcon.png');
const ageIcon = require('../assets/images/ageIcon.png');
const heightIcon = require('../assets/images/heightIcon.png');
const weightIcon = require('../assets/images/weightIcon.png');
const supportIcon = require('../assets/images/supportIcon.png');
const logoutIcon = require('../assets/images/logoutIcon.png');
const deleteIcon = require('../assets/images/deleteIcon.png');

import {SERVER_IP} from '@env';
import { data } from '@tensorflow/tfjs';

export default function Profile(){

    const navigation = useNavigation()
    const {publicAge, setPublicAge} = useContext(BMRContext);
    const {publicHeight, setPublicHeight} = useContext(BMRContext);
    const {publicWeight, setPublicWeight} = useContext(BMRContext);

    const {publicFullName, setPublicFullName} = useContext(UserInfoContext);

    const [age, setAge] = useState(publicAge);
    const [height, setHeight] = useState(publicHeight);
    const [weight, setWeight] = useState(publicWeight)

    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)

    const [newName, setNewName] = useState('')
    const [visible, setVisile] = useState(null)
    const [change, setChange] = useState()
    const [request, setRequest] = useState()

    async function handleFecth(request){

        const url = `${SERVER_IP}/Profile/api`;

        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'Email': publicEmail, "Request": request, "Name": newName}),
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
                setAge(Number(data.Info['Age']).toFixed(0))
                setHeight(Number(data.Info['Height']).toFixed(0))
                setWeight(Number(data.Info['Weight']).toFixed(0))
                


                if(data.message == 'Delete Account Successfully'){
                    Alert.alert('Status',`${data.message}...`, [
                        {text: 'Ok', onPress:()=> navigation.navigate('Flexfit')},
                    ]);
                }   
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    function handleDeleteAccount(){
        setRequest('Delete')
        
        Alert.alert('Importain !',`Are you sure for delete Account?`, [
            {text: 'Ok', onPress:()=> handleFecth(request)},
            {text: 'Cancel', onPress:()=> navigation.navigate('Profile')}
        ]);
    }

    function handleChangeName(){
        setRequest('ChangeName')
        setChange('Name')
        setVisile(true)
    }

    function handleChangeAge(){
        setRequest('ChangeAge')
        setVisile(true)
        setChange('Age')
    }

    function handleChangeHeight(){
        setRequest('ChangeHeight')
        setVisile(true)
        setChange('Height')
    }

    function handleChangWeight(){
        setRequest('ChangeWeight')
        setVisile(true)
        setChange('Weight')
    }

    function handleLogout(){
        navigation.navigate('Flexfit')
    }

    useEffect(()=>{
        handleFecth('Get_Info')
    })


    return(
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={avatarBlack_ICon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Profile picture</Text>
                    <TouchableOpacity>
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={nameChangeIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Name</Text>
                    <TouchableOpacity onPress={handleChangeName}>
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>{publicFullName === '' ? '...' : publicFullName}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={handleChangeName}>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={ageIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Age</Text>
                    <TouchableOpacity onPress={handleChangeAge}> 
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>{publicAge === '' ? '...' : age}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={handleChangeAge}>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={heightIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Height</Text>
                    <TouchableOpacity onPress={handleChangeHeight}>
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>{publicHeight === '' ? '...': height} Cm</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={handleChangeHeight}>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={weightIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Weight</Text>
                    <TouchableOpacity onPress={handleChangWeight}>
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>{publicWeight == '' ? '...': weight} Kg</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={handleChangWeight}>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={supportIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Support</Text>
                    <TouchableOpacity>
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>Help</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{flex:1}}>
                    <Image source={logoutIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <Text style={{color:'#FFFFFF'}}>Account</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={{color:'#FFFFFF', textDecorationLine:'underline'}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.delete}>
                <View style={{flex:1}}>
                    <Image source={deleteIcon} style={{width:30,height:30}}/>
                </View>
                <View style={{flex:5}}>
                    <TouchableOpacity onPress={handleDeleteAccount}>
                        <Text style={{color:'#FF9385'}}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity>
                        <Image source={rightArrow} style={{width:15,height:15, alignSelf:'center'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <ProfileModal visible={visible} onclose={()=> setVisile(false)} change={change} request={request} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        display:'flex',
        flexDirection:'column',
        paddingTop:30,
        paddingLeft:5
    },

    infoContainer:{
        display:'flex', 
        flexDirection:'row',
        padding:10
    },
    delete:{
        display:'flex', 
        flexDirection:'row',
        padding:10,
        paddingTop:50
    }
})