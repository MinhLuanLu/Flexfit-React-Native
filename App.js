import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BMRProvider } from './Context/Context_BMRCalculate';
import { UserProvider } from './Context/Context_UserInfo';
import { ImageProvider } from './Context/Context_Image';

import LaunchScreen from "./screens/startingScreen";
import Menu from './screens/menu';
import VideoTutorial from './components/videoTutorial';
import Home from './screens/home';
import SignUp from './screens/signup';
import Login from './screens/login';
import BMRTDEE from './screens/BMRTDEE';
import TrackingMeal from './screens/trackingMeal';
import Profile from './screens/profile';
import Notification from './screens/notification';
import CameraApp from './screens/Camera';
import QRCODE from './screens/QR_Code';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
      <UserProvider>
      <BMRProvider>
      <ImageProvider>
     

        <NavigationContainer>

          <Stack.Navigator>
            <Stack.Screen 
              name='Flexfit' 
              component={LaunchScreen} 
              options={{ 
                headerTitleAlign: 'center', 

                headerTitle: '',
                headerShown:false
              }} 
              
            />
            <Stack.Screen 
              name='Login' 
              component={Login} 
              options={{
                headerShown:false,
                headerTitle: 'Back',
                headerTitleAlign: 'left',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFF'
                },
                headerStyle:{
                  backgroundColor:'#000000'
                },
                headerTintColor:'#FFFF',
              }} 
            />
            
            <Stack.Screen 
              name='Home' 
              component={Home} 
              options={{
                headerTitle: '',
                headerShown:false
              }} 
            />

            <Stack.Screen 
              name='SignUp' 
              component={SignUp} 
              options={{
                headerTitle: 'Back',
                headerShown:true,
                headerTitleAlign: 'left',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFF'
                },
                headerStyle:{
                  backgroundColor:'black'
                },
                headerTintColor:'#FFFF'
              }} 
            />
            
            <Stack.Screen 
              name='Menu' 
              component={Menu} 
              options={{
                headerTitle: 'Menu ',
                headerShown:true,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#000000'
                },
                headerStyle:{
                  backgroundColor:'#E0E0E0'
                },
                headerTintColor:'#000000'
                
              }} 
            />

            <Stack.Screen 
              name='BMRTDEE' 
              component={BMRTDEE} 
              options={{
                headerTitle: 'Calculate BMR & TDEE',
                headerShown:true,
                headerShown:true,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFFFF'
                },
                headerStyle:{
                  backgroundColor:'#000000'
                },
                headerTintColor:'#FFFFFF'
                
                
              }} 
            />

            <Stack.Screen 
              name='VideoTutorial' 
              component={VideoTutorial} 
              options={{
                headerTitle: 'Videos Tutorial',
                headerShown:true,
                headerTitleAlign: 'center',
                headerShown:true,
                headerTitleStyle:{
                  fontSize:15,
                },
                headerStyle: {
                  backgroundColor: '#E0E0E0'
                },
                
              }} 
            />

            <Stack.Screen 
              name='CameraApp' 
              component={CameraApp} 
              options={{
                headerTitle: 'Camera',
                headerShown:true,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFFFF'
                },
                headerStyle: {
                  backgroundColor: '#000000'
                },
                headerTintColor:'white'
                
              }} 
            />

            

            <Stack.Screen 
              name='TrackingMeal' 
              component={TrackingMeal} 
              options={{
                headerTitle: 'Tracking Meal',
                headerTitleAlign: 'center',
                headerShown:true,
                headerTitleStyle:{
                  fontSize:15,
                },
                headerStyle: {
                  backgroundColor: '#E0E0E0'
                },
                
              }} 
            />  

            <Stack.Screen 
              name='Profile' 
              component={Profile} 
              options={{
                headerTitle: 'Profile',
                headerShown:true,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFF'
                },
                headerStyle:{
                  backgroundColor:'black'
                },
                headerTintColor:'#FFFF'
              }} 
            />


            <Stack.Screen 
              name='Notification' 
              component={Notification} 
              options={{
                headerTitle: 'Notification',
                headerShown:true,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFF'
                },
                headerStyle:{
                  backgroundColor:'black'
                },
                headerTintColor:'#FFFF'
              }} 
            />

            <Stack.Screen 
              name='QRCode' 
              component={QRCODE} 
              options={{
                headerTitle: 'Info',
                headerShown:true,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                  fontSize:15,
                  color:'#FFFF'
                },
                headerStyle:{
                  backgroundColor:'black'
                },
                headerTintColor:'#FFFF'
              }} 
            />

            
            
          </Stack.Navigator>
          
        </NavigationContainer>  

        
      </ImageProvider>
      </BMRProvider> 
      </UserProvider>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 30,
    
  }
});
