import { image } from "@tensorflow/tfjs";
import { StyleSheet, View, Modal, Text, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import {SERVER_IP} from '@env';
import PlayVideo from "../videos/playVideo";
import { useState } from "react";


export default function VideoList({data, visible, onclose, titile_Text}){

    const [visiblePlayVideo, setVisiblePlayVideo] = useState(false)
    const [videoURL, setVideoURL] = useState()
    const [videoTitle, setVideoTitle] = useState()

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listContainer}  onPress={() => {handleSelectItem(item), setVisiblePlayVideo(true)}}>
        
            <View style={styles.infoContainer}>
                
                <View style={styles.imageInfo}>
                    <Image source={{uri: `${SERVER_IP}/${item.Thumbnail}`}} style={styles.image} resizeMode='cover'/>
                </View>

                <View style={styles.texInfo}>
                    <Text style={[styles.title]}>{item.Title}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );


    function handleSelectItem(item){
        let data = {
            "Video_ID": item.id
        }
        handleFetch(data)
    }

    function handleFetch(data){

        fetch(`${SERVER_IP}/Video/api`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
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
        .then(data =>{
            if (data.message){
                console.log(data.message)
                setVideoURL(data.VideoURL)
                setVideoTitle(data.Video_Title)
            }
        })
    }
    return(
        <ScrollView style={styles.container}>
            <Modal
                visible={visible}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated={true}
            >
                <TouchableOpacity style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end'}} onPress={() => onclose()}>
    
                </TouchableOpacity>
                    
                <View style={{flex:1.5, backgroundColor:'#E0E0E0', borderRadius:10}}>
                <Text style={{color:'#000000', textAlign:'center', padding:5, width:'50%', alignSelf:'center',fontWeight:'600', marginBottom:5,marginTop:15, fontSize:20, borderRadius:2, opacity:0.8}}>{titile_Text}</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Modal>

            <PlayVideo visible={visiblePlayVideo} onclose={() => setVisiblePlayVideo(false)} videoURL={videoURL} video_title={videoTitle}/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    
    listContainer:{
        width:'95%',
        alignSelf:'center',
        borderRadius:5,
        backgroundColor:'rgba(0,0,0,0.5)',
        height:'auto',
        minHeight:80,
        justifyContent:'center',
        marginTop:20
    },

    image:{
        width:50,
        height:50,
    },
    infoContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
    },

    texInfo:{
        paddingLeft:10,
        width:'80%'
    },
    title:{
        color:'#FFFFFF',
        fontSize:15
    }


});
