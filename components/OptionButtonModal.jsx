import { StyleSheet, Button, View, Text, Modal , TouchableOpacity, SafeAreaView, TouchableWithoutFeedback} from "react-native";


export default function OptionButton({display, onClose, itemName,itemCalorie,itemMealtype, itemQuantity, removeclick, addclick}){
    return(
        
            <Modal
                visible={display}
                animationType='slide'
                statusBarTranslucent={true}
                transparent={true}
                hardwareAccelerated={true}
            >
                <View style={styles.Container}>
                    <TouchableWithoutFeedback onPress={()=>{onClose();}}>
                        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}>
                            <Text>up</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.modalContainer}>
                        <View style={styles.itemInfo}>
                            <Text style={{textAlign:'center', fontSize:18, fontWeight:'600'}}>{itemMealtype}</Text>
                            <Text style={{fontSize:18, paddingRight:10}}>{itemName} {itemQuantity}</Text>
                            <Text style={{textAlign:'center', fontSize:18}}>{itemCalorie} Kcal</Text>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={()=> addclick()} style={styles.addButton}><Text>Add Meal</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=> removeclick()} style={styles.removeButton}><Text>Remove Meal</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
  
    )
}


const styles = StyleSheet.create({
    
    Container:{
        display:'flex',
        flexDirection:'column',
        flex:1,
        justifyContent:'flex-end',
        
        
    },

    modalContainer:{
        backgroundColor:'#E0E0E0',
        height:'50%',
        display:'flex',
        flexDirection:'column',
        borderTopRightRadius:20,
        borderTopLeftRadius:30,
        
    },
    
    itemInfo:{
        backgroundColor: '#F8F8F8',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:30,
        borderTopRightRadius:20
    },

    buttonContainer:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },

    addButton:{
        backgroundColor:'#00CC81',
        flex:1,
        marginLeft:10,
        marginRight:10,
        height:60,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },

    removeButton:{
        backgroundColor:'#FF9385',
        flex:1,
        marginLeft:10,
        marginRight:10,
        height:60,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    },

    buttonText:{
        color:'#FFFFFF',
        fontSize:13,
        textAlign:'center',
    },

    

})