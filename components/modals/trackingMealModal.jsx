import { useEffect, useState } from "react";
import { StyleSheet,Text,View, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import AddMealModal from "./addMealModal";

export default function TrackingMealModal({trackingMealVisible, onclose}){

    const [addMealVisible, setAddMealVisible] = useState(null)
    const [mealTitle, setMealTitle] = useState('')

    if(addMealVisible == false){
        onclose()
    }
    
    
    return(
        <>
        <Modal
            visible={trackingMealVisible}
            animationType='slide'
            statusBarTranslucent={true}
            transparent={true}
            hardwareAccelerated={true}
        >
            
                <View style={styles.Container}>
                    <TouchableWithoutFeedback onPress={()=>{ onclose();}}>
                        <View style={{flex:1}}></View>
                    </TouchableWithoutFeedback>

                    <View style={styles.modifiedComtainer}>
                        <Text style={{fontSize:18, fontWeight:'500', paddingTop:20, textAlign:'center'}}>Choose Your Meal (type)</Text>
                        <View style={{height:'60%', justifyContent:'space-between', marginTop:50}}>
                            <View style={styles.listSelection}>
                                <TouchableOpacity style={styles.option} onPress={()=>{setAddMealVisible(true), setMealTitle('BreakFast')}}>
                                    <Text style={styles.mealTitle}>Breakfast</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.listSelection}>
                                <TouchableOpacity style={styles.option} onPress={()=>{setAddMealVisible(true); setMealTitle('Luch')}}>
                                    <Text style={styles.mealTitle}>Lunch</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.listSelection}>
                                <TouchableOpacity style={styles.option} onPress={()=>{setAddMealVisible(true), setMealTitle('Dinner')}}>
                                    <Text style={styles.mealTitle}>Dinner</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.listSelection}>
                                <TouchableOpacity style={styles.option} onPress={()=>{setAddMealVisible(true), setMealTitle('Meal (Just a meal)')}}>
                                    <Text style={styles.mealTitle}>Meal (Just a meal)</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>{onclose()}}>
                            <Text style={{fontSize:15, fontWeight:'500', textDecorationLine:'underline', textAlign:'center', marginTop:25}}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableWithoutFeedback onPress={()=>{ onclose();}}>
                        <View style={{flex:0.2}}></View>
                    </TouchableWithoutFeedback>

                    
                </View>
        </Modal>
        <AddMealModal addMealVisible={addMealVisible} onclose={()=>{setAddMealVisible(false)}} mealTitle={mealTitle}/>

        </>

    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)', 
        justifyContent:'flex-end'
    },

    modifiedComtainer:{
        backgroundColor:'#F8F8F8',
        flex:2,
        borderRadius:10
    },

    listSelection:{
        flex:1,
        justifyContent:'center',
    },

    option:{
        backgroundColor:'#E0E0E0',
        height:'90%',
        justifyContent:'center',
        width:'80%',
        alignSelf:'center',
        borderRadius:5,
        borderWidth:0.5
        
    },

    mealTitle:{
        color:'#000000',
        fontSize:15,
        fontWeight:'500',
        marginLeft:10
    }
})