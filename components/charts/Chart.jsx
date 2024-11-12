import * as React from 'react';
import { View, TouchableOpacity, Alert, StyleSheet,Text , ActivityIndicator} from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

function Chart ({completed,inProgress,completedColor,inProgressColor, result, loading }) {

  

  const data = [
    { value: completed, color: completedColor },
    { value: inProgress, color: inProgressColor},
  ];

  const handlePress = () => {
    console.log('Pie Chart Pressed', 'You touched the PieChart!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <PieChart 
          data={data}
          radius={40}
          innerRadius={30}
        />
        <TouchableOpacity 
          style={StyleSheet.absoluteFillObject} 
          onPress={handlePress}
          activeOpacity={1} 
        />
      </View>
      {loading === true && 
        <View style={{position:'absolute'}}>
          <View style={{backgroundColor:'#F8F8F8', width:70,height:70, borderRadius:70, position:'relative', justifyContent:'center'}}>
            <ActivityIndicator style={{position:'absolute', alignSelf:'center'}} size="small" color='#000000'/>
          </View>
      </View>
      }
      {loading !== true && <View loading={loading} style={{display:'flex',justifyContent:'center',position:'absolute', alignSelf:'center',width:70,height:70, borderRadius:70, backgroundColor:'#F8F8F8'}}>
          {loading !== true && <View style={{display:'flex', flexDirection:'column', alignSelf:'center'}}>
            <Text style={{fontWeight:'500',display:'flex', color:'#000000', fontSize:15}}>
              {result}%
            </Text>
          </View>}
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartWrapper: {
    position: 'relative',              
    shadowColor: '#000',                
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.4,                 
    shadowRadius: 5,                    
    elevation: 8,                      
    backgroundColor: 'grey',            
    borderRadius: 95,     
    width:80,
    height:80    
               
  }
,
});

export default Chart;
