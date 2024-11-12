import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import TrackingMealModal from '../components/modals/trackingMealModal';
import { useEffect, useState } from 'react';
import { SERVER_IP } from '@env';
import { useNavigation } from '@react-navigation/native';
import { UserInfoContext } from "../Context/Context_UserInfo";
import { useContext } from "react";
import OptionButton from '../components/OptionButtonModal';
import { data, image } from '@tensorflow/tfjs';
import { TextInput } from 'react-native-paper';




export default function TrackingMeal() {
    const [trackingMealVisible, setTrackingMealVisible] = useState(null);
    const [MealPlan, setMealPlan] = useState([]);
    const navigation = useNavigation();

    const {publicNotificationCount, setPublicNotificationCount} =useContext(UserInfoContext)
    const [dislayOptionButton, setDisplayOptionButtom]  = useState(false)

    const [itemID, setItemID] = useState(null)
    const [itemName, setItemName] = useState('')
    const [itemCalorie, setItemCalorie] = useState('')
    const [itemMealtype, setItemMealtype] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')    

    const {updateData, setUpdateData} = useContext(UserInfoContext)

    const [selectedItemId, setSelectedItemId] = useState([]);


    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)
    const url = `${SERVER_IP}/Get/MealPlan/api`;

    // Function to fetch meal plan data
    const handleGetMealPlan = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({"Email": publicEmail})
            });

            if (!response.ok) {
                throw new Error('Failed to fetch meal plan data.');
            }

            const data = await response.json();
            if (data.message) {
                setMealPlan(data.Data);  
            }
        } catch (error) {
            console.error('Error fetching meal plans:', error);
        }
    };

    useEffect(() => {
        
        handleGetMealPlan();
    }, [trackingMealVisible]);

    
    useEffect(() => {
        if (trackingMealVisible === false) {
            console.log('Updating meal plan data...');
            handleGetMealPlan(); 
        }
    }, [trackingMealVisible]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.MealPlanContainer, { opacity: selectedItemId.includes(item.id) ? 0.2 : 1 }]} onPress={() => handleSelectItem(item)}>
        
            <View style={styles.infoContainer}>
                
                <View style={styles.imageInfo}>
                    <Image source={{uri: item.Image_url}} style={styles.image} resizeMode='cover'/>
                </View>

                <View style={styles.texInfo}>
                    <Text style={[styles.title]}>{item.Meal_Type}</Text>
                    <Text style={styles.foodName}>{item.FoodName} {item.Quantity} / {item.Calorie} Kcal</Text>
                </View>

            </View>
            <View style={styles.MacroContainer}>
                <Text style={styles.kcal}>Protein: {item.Protein} Kcal</Text>
                <Text style={styles.kcal}>Fat: {item.Fat} Kcal</Text>
                <Text style={styles.kcal}>Carb: {item.Carb} Kcal</Text>
            </View> 
            
        </TouchableOpacity>
    );

    function handleSelectItem(item){
        setItemID(item.id)
        setItemName(item.FoodName)
        setItemCalorie(item.Calorie)
        setItemMealtype(item.Meal_Type)
        setItemQuantity(item.Quantity)
        setDisplayOptionButtom(true)
        
        setSelectedItemId(prevSelectedIds =>
            prevSelectedIds.includes(item.id)
                ? prevSelectedIds.filter(id => id !== item.id) // Remove if already selected
                : [...prevSelectedIds, item.id]                // Add if not selected
        );
        
        
        
    }

    function addButton(){
        let request = 'Add'
        handleAddandRemove(request)
    }



    async function handleAddtoNotification(title, message){
        const currentDate = new Date();

        // Get the components of the date
        const day = String(currentDate.getDate()).padStart(2, '0'); // Day of the month (01-31)
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month (01-12)
        const year = currentDate.getFullYear(); // Full year (YYYY)

        // Get hours and format to 12-hour format
        let hours = currentDate.getHours();
        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Minutes (00-59)
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

        // Convert hours to 12-hour format
        hours = hours % 12; // Convert to 12-hour format
        hours = hours ? String(hours).padStart(2, '0') : '12'; // The hour '0' should be '12'

        // Construct the formatted date string
        const dateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
        
        let data = {
            "Email": publicEmail,
            "Title": title,
            "Message": message,
            "Type": "Notification",
            "Send_At": dateTime
        }

        console.log(data)
        await fetch(`${SERVER_IP}/Notification/api`,{
            method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
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
                console.log(data.message)
                setPublicNotificationCount(publicNotificationCount + 1)
            }
        })

        .catch(error =>{
            console.error('error... Try again')
        })

    }



    function removeButton(){
        let request = 'Remove'
        handleAddandRemove(request)
    }



    async function handleAddandRemove(request) {
        let data = {
            "id": itemID,
            "Request": request,
            "Email": publicEmail
        }

        await fetch(`${SERVER_IP}/AddTrackingMeal/api`,{
            method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
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
                console.log(data.message)
                setUpdateData('readyUpdate')

                ////// add to Notificaton
                if(data.Request == 'Add'){
                    let message = `You just added ${itemQuantity} ${itemName} as ${itemMealtype} with ${itemCalorie} Kcal`
                    Alert.alert('Notification', 'You Add',[
                        {text: 'Ok', onPress:()=>  {setDisplayOptionButtom(false), handleAddtoNotification("Add meal", message)}}
                    ])
                }

                if(data.Request == 'Remove'){
                    let message = `You just Removed ${itemQuantity} ${itemName} as ${itemMealtype} with ${itemCalorie} Kcal`
                    Alert.alert('Notification', 'You Removed',[
                        {text: 'Ok', onPress:()=>  {setDisplayOptionButtom(false), handleAddtoNotification("Remove meal", message)}}
                    ])
                }
            }
        })

        .catch(error =>{
            console.log('error... Try again')
        })

        
    }

    
    
    if (trackingMealVisible === true) {
        return <TrackingMealModal trackingMealVisible={trackingMealVisible} onclose={() => setTrackingMealVisible(false)} />;
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <FlatList
                        data={MealPlan}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        
                    />
                    
                </View>
                
                <TouchableOpacity
                    style={{ position: 'absolute', backgroundColor: '#00BCD4', bottom: 20, right: 15, borderRadius: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
                    onPress={() => { setTrackingMealVisible(true); }}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 13 }}>+</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <TrackingMealModal trackingMealVisible={trackingMealVisible} onclose={() => setTrackingMealVisible(false)} />
            <OptionButton addclick={addButton} removeclick={removeButton} display={dislayOptionButton} onClose={()=> setDisplayOptionButtom(false)} itemName={itemName} itemCalorie={itemCalorie} itemMealtype={itemMealtype} itemQuantity={itemQuantity}/>
            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E0E0E0',
        marginTop:20,        
    },

    
    MealPlanContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        width:'95%',
        alignSelf:'center',
        marginBottom:30,
        borderRadius:5
    },

    infoContainer:{
        display:'flex',
        flexDirection:'row',
    },

    imageInfo:{
        flex:1,
        alignItems:'center'
    },

    image:{
        height:80,
        width:60,
        marginTop:10
    },

    texInfo:{
        flex:2,
         justifyContent:'center'
    },
    title:{
        fontSize:20,
        fontWeight:'600',
        color:'#FFFFFF'
    },

    foodName:{
        fontSize:15,
        color:'#FFFFFF'
    },

    MacroContainer:{
        display:'flex',
        flexDirection:'row',
        paddingTop:10,
        justifyContent:'space-between',
        marginRight:20,
        marginLeft:20,
        paddingBottom:10,
    },

    kcal:{
        fontSize:14,
        fontWeight:'400',
        color:'#FFFFFF'
    }

});
