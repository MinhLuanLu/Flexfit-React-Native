
import { StyleSheet, View, Text } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useState } from "react";

export default function Calendarlay(){
    const [selectedDate, setSelectedDate] = useState('');

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };
    

    return(
        <View style={styles.calendarContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            Selected Date: {selectedDate}
            </Text>
            <Calendar
            style={styles.calendar}
            onDayPress={onDayPress}
            markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
            }}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#f0f0f0',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                arrowColor: 'orange',
                monthTextColor: 'blue',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
            }}
            />
      </View>
    )
}

const styles = StyleSheet.create({
    
  });
  