import { StyleSheet,Text,Image, TouchableOpacity , View, Modal, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import { useNavigation } from "@react-navigation/native";

const macro = require('../../assets/images/macro.png');

export default function NoDataModal({visible, onClose}){
    const navigation = useNavigation()
    return(
        <SafeAreaView>
            <Modal
                visible={visible}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated={true}
                
            >
                <TouchableWithoutFeedback  onPress={()=>{onClose()}}>
                    <View style={styles.Container}>
                        <View style={styles.contentContainer}>
                            <View style={styles.textContainer}>
                                <Text style={{fontSize:15, color:'#000000', textAlign:'center', marginTop:20, width:'80%', fontWeight:'600'}}>Currently, You don't have any macro data yet. Please calculate your macros to continue..</Text>
                            </View>
                            <TouchableOpacity style={styles.imageContainer} onPress={()=>{onClose(), navigation.navigate('BMRTDEE')}}>
                                <Image style={{resizeMode:'cover', height:'80%', width:'100%'}} source={macro}/>
                                <Text style={styles.calculateMacro}>Calculate Macro</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:'flex-end', 
    },

    contentContainer:{
        height:'50%',
        backgroundColor:'#C0C0C0',
        justifyContent:'center',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    textContainer:{
        flex:0.5,
        alignItems:'center'
    },

    imageContainer:{
        flex:2,
        height:50,
        position:'relative',
        justifyContent:'center'
    },
    calculateMacro:{
        color:'#000000',
        fontSize:15,
        fontWeight:'500',
        backgroundColor:'#E0E0E0',
        position:'absolute',
        padding:5,
        alignSelf:'center',
        opacity:0.8
    }
})