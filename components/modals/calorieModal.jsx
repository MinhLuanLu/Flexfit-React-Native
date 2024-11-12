import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback,Modal , SafeAreaView} from "react-native";
import { useState } from "react";
import { BMRContext } from "../../Context/Context_BMRCalculate";
import { useContext } from "react";
import MiddelLayer from "../MiddelLayer_homeScreen";

export default function CalorieModal({ visible, onClose }) {



    const {publicTotalCalorieDefault, setPublicTotalCalorieDefault}= useContext(BMRContext);
    const { publicTotalProteinDefault, setPublicTotalProteinDefault} = useContext(BMRContext)
    const {publicTotalFatDefault, setPublicTotalFatDefault} = useContext(BMRContext)
    const {publicTotalCarbDefault, setPublicTotalCarbDefault} =useContext(BMRContext)

    const {publicTotalProteinDidTake, setPublicTotalProteinDidTake} = useContext(BMRContext)
    const { publicTotalCalorieDidTake, setPublicTotalCalorieDidTake} = useContext(BMRContext)
    const {publicTotalFatDidTake, setPublicTotalFatDidTake} = useContext(BMRContext)
    const {publicTotalCarbDidTake, setPublicTotalCarbDidTake} = useContext(BMRContext)

    const {publicFitnessLevel, setPublicFitnessLevel} = useContext(BMRContext);
    const {publicGoal, setPublicGoal} = useContext(BMRContext)
    const {publicBMR, setPublicBMR} = useContext(BMRContext);
    const {publicTDEE, setPublicTDEE} = useContext(BMRContext);



   
    return (
        <SafeAreaView>
            
                <Modal
                    visible={visible}
                    animationType='slide'
                    statusBarTranslucent={true}
                    transparent={true}
                    hardwareAccelerated={true}
                
                >
                    <TouchableWithoutFeedback onPress={()=>{onClose()}}>
                        <View style={styles.Container}>
                                <View>
                                    <Text style={{fontSize:25, textAlign:'center', fontWeight:'500', paddingBottom:20, color:'#FFFFFF'}}>Your Goal: 
                                        <Text style={{fontSize:20, fontWeight:'400'}}> {publicGoal}</Text>
                                    </Text>
                                </View>
                                <View style={{backgroundColor:'#E0E0E0', height:'50%', width:'95%', alignSelf:'center', borderRadius:10, position:'relative'}}>
                                    <View style={{height:'50%', justifyContent:'center'}}>
                                        <Text style={styles.title}>Your BMR: 
                                            <Text style={styles.num}> {publicBMR} Kcal</Text>
                                        </Text>
                                        <Text style={styles.title}>Your TDEE: 
                                            <Text style={styles.num}> {publicTDEE} Kcal</Text>
                                        </Text>
                                        <Text style={styles.title}>Your Calories Intake: 
                                            <Text style={styles.num}> {publicTotalCalorieDefault} Kcal</Text>
                                        </Text>
                                    </View>
                                    <View style={{position:'absolute', bottom:20}}>
                                        <MiddelLayer/>
                                    </View>
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
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.5)', // Semi-transparent background
    },

    title:{
        fontSize:18,
        fontWeight:'500',
        textAlign:'center'
    },

    num:{
        fontSize:15,
        fontWeight:'400'
    }
});
