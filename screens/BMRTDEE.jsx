
import React, { useState } from 'react';
import { StyleSheet, View, Text,Button,TouchableOpacity } from 'react-native';
import { ProgressBar, RadioButton } from 'react-native-paper';
import Swiper from 'react-native-swiper'
import { useContext } from 'react';
import { BMRContext } from '../Context/Context_BMRCalculate';

import BMRTEDD_Calculator from '../components/BMRTEDD_Calculator'


export default function BMRTDEE() {
  const [canswipe, setCanSwipe] = React.useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);

  const {publicFitnessLevel, setPublicFitnessLevel} = useContext(BMRContext);
  const {publicGoal, setPublicGoal} = useContext(BMRContext);
  const {publicActiveLevel, setPublicActiveLevel} =useContext(BMRContext);
  

  const [fitnessLevel, setFitnessLevel] = useState()
  const [goal, setGoal] = useState()
  const [activityLevel, setActivityLevel] = useState()
   

  function handleClick(){
      setTimeout(() =>{
        setCanSwipe(true);  
        setSwiperIndex(prevIndex => prevIndex + 1);  
        setCanSwipe(false)
 
      },100)  
  }


  return (
    <View style={styles.container}>
        <Swiper 
              style={styles.wrapper} 
              index={swiperIndex} 
              loop={false} 
              scrollEnabled={canswipe}  
              dotColor='#F8F8F8'
              activeDotColor='#000000'
              showsPagination={true}>

          <View style={styles.slide1}>
            <View style={{padding:30, paddingBottom:40}}>
              <Text style={{color:'#000000', fontSize:25, fontWeight:'800',textAlign:'center', borderBottomWidth:0.5, paddingBottom:10}}>Your Fitness Level</Text>
            </View>
            <View style={styles.slectionContainer}>
              <View style={styles.layerContainer}>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setFitnessLevel('Newbie'), handleClick()}}>
                  <Text style={styles.title}>Newbie</Text>
                  <Text style={styles.Description}>I've never trained before.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setFitnessLevel('Beginner'),handleClick()}}>
                  <Text style={styles.title}>Beginner</Text>
                  <Text style={styles.Description}>Some experience.</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.layerContainer}>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setFitnessLevel('Intermediate'),handleClick()}}>
                  <Text style={styles.title}>Intermediate</Text>
                  <Text style={styles.Description}>Moderate experience with consistent tranning.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setFitnessLevel('Advance'),handleClick()}}>
                  <Text style={styles.title}>Advance</Text>
                  <Text style={styles.Description}>Very experienced with consistent tranning.</Text>
                </TouchableOpacity>
              </View>
            </View>

            
          </View>

          <View style={styles.slide2}>
            <View style={{padding:30, paddingBottom:40}}>
              <Text style={{color:'#000000', fontSize:25, fontWeight:'800',textAlign:'center', borderBottomWidth:0.5, paddingBottom:10}}>Goals</Text>
            </View>

            <View style={styles.slectionContainer}>
              <View style={styles.layerContainer}>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setGoal('Build Strength'), handleClick()}}>
                  <Text style={styles.title}>Build Strength</Text>
                  <Text style={styles.Description}>Get stronger and perform exerises.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setGoal('Build Muscle'), handleClick()}}>
                  <Text style={styles.title}>Build Muscle</Text>
                  <Text style={styles.Description}>Increase volume to ensure muscle growth.</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.layerContainer}>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setGoal('Lose Fat'), handleClick()}}>
                  <Text style={styles.title}>Lose Fat</Text>
                  <Text style={styles.Description}>Optimize for hight intensity fat bruning workouts.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setGoal('Learn Techniques', handleClick())}}>
                  <Text style={styles.title}>Learn Techniques</Text>
                  <Text style={styles.Description}>Master basic to advanced skills.</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>


          <View style={styles.slide3}>
            <View style={{padding:30, paddingBottom:40}}>
              <Text style={{color:'#000000', fontSize:25, fontWeight:'800',textAlign:'center', borderBottomWidth:0.5, paddingBottom:10}}>Activity Level</Text>
            </View>
            
            <View style={styles.slectionContainer}>
              <View style={styles.layerContainer}>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setActivityLevel('Sedentary'), handleClick()}}>
                  <Text style={styles.title}>Sedentary</Text>
                  <Text style={styles.Description}>Little or no exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer} onPress={()=> {setActivityLevel('Lightly Active'), handleClick()}}>
                  <Text style={styles.title}>Lightly Active</Text>
                  <Text style={styles.Description}>Exercise 1-3 times/week.</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.layerContainer}>
                <TouchableOpacity style={styles.boxContainer}  onPress={()=> {setActivityLevel('Moderately Active'), handleClick()}}>
                  <Text style={styles.title}>Moderately Active</Text>
                  <Text style={styles.Description}>Exercise 3-5 times/week.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxContainer}  onPress={()=> {setActivityLevel('Very Active'), handleClick()}}>
                  <Text style={styles.title}>Very Active</Text>
                  <Text style={styles.Description}>Hard exercise/sports 6-7 days a week.</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{backgroundColor:'#F8F8F8', width:'70%',height:100, marginTop:10, borderRadius:20, alignSelf:'center'}}  onPress={()=> {setActivityLevel('Super Active'), handleClick()}}>
                  <Text style={styles.title}>Super Active</Text>
                  <Text style={styles.Description}>Very hard exercise/sports, physical job, or training twice a day.</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>


          <View style={styles.slide4}>
              <BMRTEDD_Calculator fitnessLevel={fitnessLevel} goal={goal} activeLevel={activityLevel}/>
          </View>
        </Swiper>
        

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E0E0E0'
  },
  wrapper: {},

  slide1:{
    flex:1
  },
  
  slide3:{
    flex:1
  },
  slide4:{
    flex:1
  },
  slectionContainer:{
    height:'60%', 
    flexDirection:'column'
  }
  ,
  layerContainer:{
    flex:1, flexDirection:'row', 
    justifyContent:'center',
  },

  boxContainer:{
    height:'90%',
    width:'40%',
    backgroundColor:'#F8F8F8',
    marginLeft:20,
    marginRight:20,
    borderRadius:20
  },

  title:{
    fontSize:20,
    fontWeight:'600',
    textAlign:'center',
    padding:5
  },

  Description:{
    padding:10
  }
});
