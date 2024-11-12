import { StyleSheet, TextInput, Text, View,Image, TouchableOpacity, Alert } from "react-native";
import { Button, Checkbox } from 'react-native-paper';
import * as React from 'react';
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserInfoContext } from "../Context/Context_UserInfo";
import {SERVER_IP} from '@env'

export default function SignUp() {
    const navigation = useNavigation();

    const logo = require("../assets/images/flexfit_logo.png");

    const [checked, setChecked] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [ableButton, setAblebutton] = React.useState(true);
    const [fullName, setFullName] =React.useState('');
    const [email, setEmail] =React.useState('');
    const [password, setPassword] =React.useState('');
    const [confirmPassword, setConfirmPassword] =React.useState('');

    const [signupForm, setSignupForm] =React.useState();

    const {publicNotificationToken, setPublicNotificationToken} = useContext(UserInfoContext);

    const handleChecked = () => {
       setChecked(!checked);
       if(checked == true){
            //console.log(checked);
            setAblebutton(false);
       }

       if(checked == false){
            setAblebutton(true)
       }

    };

    const handleButton = () =>{

        if(password == confirmPassword || fullName != '' || email != ''){
            setLoading(true)
            const data = {
                "FullName": fullName,
                "Email": email,
                "Password": password,
                "Policy": !checked
            };

            Fetching(data);

       
        }

        if(fullName == '' || email == ''){
            alert('FullName or Email is Emty')
        }
        if(password != confirmPassword){
            alert('Password not match')
        }
        
    }

    function Fetching(data){
        const URL = `${SERVER_IP}/Register/api`; 
        
        fetch(URL,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
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
        .then(data=>{
            if(data.message){
                console.log(data.message);
                setTimeout(()=>{
                    setLoading(false);
                    handleLoginwithFlexfit();
                    deleteFeild();
                },3000)
            }
        })
        .catch(error=>{
            setTimeout(()=>{
                console.log(error);
                setLoading(false)
            },5000)
        })
    }

    function handleLoginwithFlexfit (){
        navigation.navigate('Login')  
       
      }
    
    function deleteFeild(){
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setChecked(true);
        setAblebutton(true);
    }


    return (
        <View style={styles.Container}>
            <View style={styles.logoContainer}>
                <Text style={styles.headerText}>Sign Up</Text>
                <Image source={logo} style={{width:60,height:60}}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{color:'#000000', paddingBottom:5}}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                />
                <Text style={{color:'#000000', paddingBottom:5}}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Text style={{color:'#000000', paddingBottom:5}}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Text style={{color:'#000000', paddingBottom:5}}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                />
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        color="green"
                        uncheckedColor="#000000"
                        status={checked ? 'unchecked' : 'checked'}
                        onPress={handleChecked}
                    />
                    <Text style={styles.checkboxLabel}>Agree with the policy</Text>
                </View>
            </View>
            <Button
                style={{
                    width:320,
                    alignSelf:'center',
                    padding:5,
                }}
                textColor="black"
                buttonColor="#FFE740"
                loading={loading}
                onPress={handleButton}
                disabled={ableButton}
            >
                {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <View style={{alignItems:'center', marginTop:10}}>
                <TouchableOpacity onPress={handleLoginwithFlexfit}>
                <Text style={{color:'#000000', fontWeight:'500', fontSize:15}}>Login</Text>
                </TouchableOpacity>
           
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#E0E0E0'
    },
    logoContainer: {
        padding:20,
        height:100,
        alignItems:'center',
    },
    headerText: {
        fontSize: 27,
        fontWeight: 'bold',
        color:'#000000'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingTop:20
    },
    input: {
        marginBottom: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
        color:'#000000',
        minHeight:53,
        maxHeight:55,
    },
    checkboxContainer: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginTop: 7,
        color:'#000000'
    },
});
