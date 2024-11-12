import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,View, SafeAreaView,Image, TouchableOpacity} from 'react-native';
import {Card } from 'react-native-paper';
import Header from '../components/header';

const yogabackgound = require('../assets/images//background.jpg');
const fitness = require('../assets/images/fitness.png');
const yoga = require('../assets/images/yoga.jpg');
const tracking = require('../assets/images/tracking.png');
const meal_plan = require('../assets/images/meal_prep.png');

import { useNavigation } from '@react-navigation/native';

export default function Menu(){
    const navigation = useNavigation()

    return(
        <>

            <SafeAreaView style={styles.container}>
                <View style={{flex:1,justifyContent:'center', paddingBottom:5, paddingTop:5}}>
                    <TouchableOpacity style={{flex:1}}>
                        <Card.Cover source={yoga} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover', position:'relative' }}></Card.Cover>
                    </TouchableOpacity>
                    <Text style={{display:'flex', position:'absolute', color:'white', fontWeight:'500', fontSize:18, backgroundColor:'grey', padding:5,paddingLeft:20,paddingRight:10}}>Yoga</Text>
                </View>
                
                <View style={{flex:1,justifyContent:'center', paddingBottom:5}}>
                    <TouchableOpacity style={{flex:1}} onPress={()=> navigation.navigate('Fitness') }>
                        <Card.Cover source={fitness} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}></Card.Cover>
                    </TouchableOpacity>
                    <Text style={{display:'flex', position:'absolute', color:'white', fontWeight:'500', fontSize:18, backgroundColor:'grey', padding:5,paddingLeft:15,paddingRight:10}}>Fitness</Text>
                </View>

                <View style={{flex:1, justifyContent:'center', paddingBottom:5}}>
                    <TouchableOpacity style={{flex:1}}>
                        <Card.Cover source={tracking} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}></Card.Cover>
                    </TouchableOpacity>
                    <Text style={{display:'flex', position:'absolute', color:'white', fontWeight:'500', fontSize:18, backgroundColor:'grey', padding:5,paddingLeft:10,paddingRight:10}}>Tracking...</Text>
                </View>

                <View style={{flex:1, justifyContent:'center', paddingBottom:5}}>
                    <TouchableOpacity style={{flex:1}}>
                        <Card.Cover source={meal_plan} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}></Card.Cover>
                    </TouchableOpacity>
                    <Text style={{display:'flex', position:'absolute', color:'white', fontWeight:'500', fontSize:18, backgroundColor:'grey', padding:5,paddingLeft:20,paddingRight:10}}>Meal Plan</Text>
                </View>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container:{
        display:'flex', 
        flex:1, 
        flexDirection:'column', 
        justifyContent:'space-between', 
        backgroundColor:'#E0E0E0',
    }

  })
  