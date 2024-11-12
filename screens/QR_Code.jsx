import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { UserInfoContext } from "../Context/Context_UserInfo"
import { useContext, useEffect, useState } from "react";
import {SERVER_IP} from '@env'
import { useNavigation } from "@react-navigation/native";
export default function QRCODE(){

    const {publicFullName, setPublicFullName} = useContext(UserInfoContext);
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)

    const navigation = useNavigation()
    
    const [QR_Code, setQR_Code] = useState()
    async function handleFecth(request){

        const url = `${SERVER_IP}/QRCode/api`;

        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'Email': publicEmail, "Request": request, "FullName": publicFullName}),
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
                //console.log(data.message)
                setQR_Code(data.QR_Code) 
               
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        handleFecth('Get_QRCode')
    })

    return(
        <TouchableWithoutFeedback onPress={()=> navigation.navigate('Home')}>
            <View style={styles.Container}>
                
                    <View style={styles.QRCode_Container}>
                        <Image source={{uri: `${SERVER_IP}${QR_Code}`}} resizeMode="cover" style={styles.img_Style}/>
                    </View>
                    <Text style={{color:'white', textAlign:'center', marginTop:10, fontSize:18, fontWeight:'600'}}>{publicFullName}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)'
    },

    QRCode_Container:{
        backgroundColor:'grey',
        width:'80%',
        height:280,
        alignSelf:'center',
        marginTop:20
    },

    img_Style:{
        width:'100%',
        height:'100%'
    }
})