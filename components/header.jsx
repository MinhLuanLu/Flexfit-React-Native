import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,View, SafeAreaView, Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useContext, useState } from 'react';
import { UserInfoContext } from '../Context/Context_UserInfo';

const avatar = require('../assets/images/avatar.png');
const settingIcon = require('../assets/images/settingIcon.png');


export default function Header(){

    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = today.getDay(); 
    const dayOfMonth = today.getDate(); 
    const month = today.getMonth(); 


    const currentDate = `${daysOfWeek[dayOfWeek]}, ${dayOfMonth} ${monthsOfYear[month]}`;

    const {publicFullName, setPublicFullName} = useContext(UserInfoContext);
    const [FullName, setFullName] = useState(publicFullName);
    const navigation = useNavigation();

    function handleSetting(){
        setTimeout(()=>{
            navigation.navigate('Profile');
        },300)
    }

    return(
        <>
            <SafeAreaView style={styles.container}>
                <View style={{flex:1, paddingLeft:15, display:'flex', flexDirection:'row'}}>
                    <View> 
                        <TouchableOpacity onPress={()=> navigation.navigate('QRCode')}>
                            <Image source={avatar}style={{height:40, width:40, alignSelf:'flex-end', display:'flex', marginRight:20, marginTop:5}}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text  style={{fontSize:15, fontWeight:'500', color:'#000000'}}>Hi, {publicFullName}</Text>
                        <Text style={{fontSize:20, fontWeight:'800', color:'#000000'}}>{currentDate}</Text>
                    </View>
                </View>
                <View style={{flex:0}}>
                    <TouchableOpacity onPress={handleSetting}>
                        <Image source={settingIcon}style={{height:30, width:30, alignSelf:'flex-end', display:'flex', marginRight:20, marginTop:5}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        flex:0,
        height:70,
        alignItems:'center',
        backgroundColor:'#E0E0E0'
        
    }
})

