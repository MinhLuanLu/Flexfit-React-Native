import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import {Video} from 'expo-av';
import { useEffect, useState , useRef} from "react";
import {SERVER_IP} from '@env'


export default function PlayVideo( {visible, videoURL, onclose, video_title}){
  
    const [isPlaying, setIsPlaying] = useState(true);
    const [playback, setPlayBack] = useState(null)
    const [playForward, setPlayForward] = useState(null)
    const [status, setStatus] = useState({});
    const video = useRef(null);

    
    const togglePlayPause = async () => {
      setIsPlaying(true)
        if (isPlaying) {
            await video.current.pauseAsync(); // Pause the video
        } else {
            await video.current.playAsync(); // Play the video
        }
        setIsPlaying(!isPlaying); // Toggle play/pause state
    };

    const handlePlaybackStatusUpdate = (status) => {
        setStatus(() => status);
    };
   
    async function handleSpeed(){
        const currentPositionMillis = status.positionMillis;
        if(playback == true){
            const newPositionMillis = Math.max(currentPositionMillis - 5000, 0);
            await video.current.setPositionAsync(newPositionMillis);
            setPlayBack(null)
        }

        if(playForward == true){
            const newPositionMillis = Math.max(currentPositionMillis + 5000, 0);
            await video.current.setPositionAsync(newPositionMillis);
            setPlayForward(null)
        }
    }

    return (
          <Modal
                visible={visible}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated={true}
          >
            
          <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.videoContainer} onPress={()=> onclose()} >
              <View>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{ uri: `${SERVER_IP}/${videoURL}` }} 
                    useNativeControls={false}
                    resizeMode="cover" // Adjust video size
                    isLooping={true}
                    shouldPlay={true}
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                    
                />
                <Text style={{color:'#FFFFFF', position:'absolute', bottom:100, paddingLeft:15}}>{video_title}</Text>
              </View>
              
              </TouchableWithoutFeedback>
                <View style={styles.controlContainer}>
                  <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.playButton}  onPress={()=>{handleSpeed(), setPlayBack(true)}}>
                          <Text style={{fontSize:12}}>5s</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.pauseButton}  onPress={togglePlayPause} >
                          <Text style={{}}>{isPlaying ? 'Pause' : 'Play'}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.playButton}  onPress={()=>{setPlayForward(true), handleSpeed()}}>
                          <Text style={{fontSize:12}}>5s</Text>
                      </TouchableOpacity>
                      
                  </View>
                </View>
            </View>
          </Modal>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:'#000000'
      },

      videoContainer:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:15
      },


      video: {
        width: '98%',
        height: '90%', // Set the height of the video
        borderRadius:10
      },

      controlContainer:{
        position:'absolute',
        alignSelf:'center',
        bottom:20
      },

      buttonContainer:{
        height:'50%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
      },

      pauseButton:{
        backgroundColor:'#F8F8F8',
        width:70,
        height:70,
        alignSelf:'center',
        borderRadius:35,
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center'
      },

      playButton:{
        backgroundColor:'#F8F8F8',
        width:35,
        height:35,
        alignSelf:'center',
        borderRadius:35,
        borderWidth:0.5,
        marginLeft:30,
        marginRight:30,
        justifyContent:'center',
        alignItems:'center'
      }
    });
    