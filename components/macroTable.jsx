import { data } from "@tensorflow/tfjs";
import { useState } from "react";
import { StyleSheet,View, Text } from "react-native";


export default function MacroTable({objectName, protein, fat, carb, calorie, quantity}){

    return(
        <View style={styles.Container}>
            
            <View style={styles.className} >
                <Text style={{color:'#000000', fontSize:20}}>{objectName}</Text>
                <Text style={{color:'#000000'}}>Total Calories: {calorie} Kcal / {quantity}</Text>
            </View>
            <View style={styles.calorieContainer}>
                <View style={styles.header}>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'500'}}>Protein</Text>
                    </View>  
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'500'}}>Fat</Text>
                    </View>  
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'500'}}>Carb</Text>       
                    </View>    
                </View>
                <View style={styles.data}>

                    <View style={{flex:1, alignItems:'center', marginTop:5}}>
                        <Text style={{color:'#000000', fontSize:15}}>{protein}</Text>
                    </View>  
                    <View style={{flex:1, alignItems:'center', marginTop:5}}>
                        <Text style={{color:'#000000', fontSize:15}}>{fat}</Text>
                    </View>  
                    <View style={{flex:1, alignItems:'center', marginTop:5}}>
                        <Text style={{color:'#000000', fontSize:15}}>{carb}</Text>       
                    </View>  
                    
                </View>
            
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({

    Container:{
        flex:1,
        
    },
    className:{
        marginLeft:18
    },
    calorieContainer:{
        flex:1,
        alignItems:'center',    
    },
    
    header:{
        marginTop:10,
        height:30,
        width:'95%',
        display:'flex',
        flexDirection:'row',
        backgroundColor:'grey',
        justifyContent:'space-between',
        borderWidth:1
    },
     data:{
        marginTop:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        width:'95%',
        height:'20%',
        borderWidth:1,
        borderTopWidth:0
     }
    
})