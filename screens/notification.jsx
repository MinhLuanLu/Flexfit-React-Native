import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { UserInfoContext } from '../Context/Context_UserInfo';
import {SERVER_IP} from '@env'


const Notification = () => {
    // Render each notification item
    const {publicNotification, setPublicNotification} = useContext(UserInfoContext)
    const {publicEmail, setPublicEmail} = useContext(UserInfoContext)
    const {publicNotificationCount, setPublicNotificationCount} = useContext(UserInfoContext)
    const data = {
        Notification: publicNotification
    };
    const renderItem = ({ item }) => (
                                                                                //To select and handle each notification item when touched, 
        <TouchableOpacity style={styles.notificationContainer} onPress={() => handleSelectItem(item)}> 
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.message}>{item.Message}</Text>
            <Text style={styles.date}>Sent at: {item.Send_at}</Text>
        </TouchableOpacity>
    );

    function handleSelectItem(item) {
        let getItemID = item.id
        handleFecthNotification({"Email":publicEmail, "ID": getItemID})
       
    }

    async function handleFecthNotification(data){
        const url = `${SERVER_IP}/Notification/api`;
        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }
            if (res === 400){
                return res.json();
            }
        })
        .then(data =>{
            if(data.Notification_Status){
                console.log(data.Notification_Status)
                setPublicNotificationCount(publicNotificationCount - 1)
                if (publicNotificationCount <= 1){
                    setPublicNotificationCount(null)
                }
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={data.Notification}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()} // Using id as a unique key
            />
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9'
    },
    notificationContainer: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 16,
        marginVertical: 5
    },
    date: {
        fontSize: 14,
        color: '#888'
    },
    createdAt: {
        fontSize: 12,
        color: '#aaa'
    }
});

export default Notification;
