import * as React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet,Text, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Button } from 'react-native-paper';
import { BMRContext } from '../../Context/Context_BMRCalculate';
import { useContext } from 'react';
import { useEffect } from 'react';


export default function CalorieChart ({displayCalorieModal, completedCalories,inProgressCalories, result, loading }) {

  const { publicCalorie, setPublicCalorie} = useContext(BMRContext)

  function handleVisible(){
    displayCalorieModal();
  }

  
  

  

  const data = [
    { value: completedCalories, color: '#FFE740', text: 'Yellow' },
    { value: inProgressCalories, color: 'grey', text: 'Grey' },
  ];

  const handlePress = () => {
    console.log('Pie Chart Pressed', 'You touched the PieChart!');
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <PieChart 
          data={data}
          radius={80}
          innerRadius={50}
        />
        <TouchableOpacity 
          style={StyleSheet.absoluteFillObject} 
          onPress={handlePress}
          activeOpacity={1} 
        />
      </View>
      {loading === true && 
        <View style={{position:'absolute'}}>
            <View style={{backgroundColor:'#F8F8F8', width:80,height:80, borderRadius:70, position:'relative', justifyContent:'center'}}>
                <ActivityIndicator style={{position:'absolute', alignSelf:'center'}} size="small" color='#000000'/>
            </View>
        </View>
      }
      {loading !== true && <Button onPress={handleVisible}  loading={loading} style={{display:'flex',position:'absolute', width:140,height:'70%',borderRadius:90,backgroundColor:'#F8F8F8', justifyContent:'center', alignItems:'center'}}>
          <TouchableWithoutFeedback onPress={handleVisible}>
            <View style={{display:'flex', flexDirection:'column', alignSelf:'center'}}>
              <View style={{display:'flex'}}>
                <Text style={{color:'#000000', fontSize:20,fontWeight:'500'}}>
                  {result}
                <Text style={{fontSize:15, color:'#000000'}}> Kcal</Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
      </Button>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartWrapper: {
    position: 'relative',              
    shadowColor: '#000',                
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.4,                 
    shadowRadius: 5,                    
    elevation: 8,                                  
    borderRadius: 90,                
    justifyContent:'center',
    alignItems:'center',
    width:80,
    height:80
  }
,
});


