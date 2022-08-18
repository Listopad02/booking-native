import { Image, 
    Button, 
    Text, 
    View, 
    TextInput, 
    Pressable, 
    StyleSheet,
    TouchableHighlight } from "react-native";
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDate } from "../redux/slice/confirmSlice";
import { setObjectDateHook } from "../redux/slice/booking";


const DatePickerComponent = () => {
    function converterDate(date) {
        let res = [
            addLeadZero(date.getDate()),
            addLeadZero(date.getMonth() + 1),
            date.getFullYear(),
        ].join(".");
        function addLeadZero(val) {
            if (+val < 10) return "0" + val;
            return val;
        }
        return res;
    }
    
    const dispatch = useAppDispatch()
    const [date, setDateFunc] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(setObjectDateHook(new Date()))
        dispatch(setDate(converterDate(date)))
    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDateFunc(currentDate);
        dispatch(setObjectDateHook(currentDate))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

  return (
    <View>
        <View style={styles.button}>
            <Pressable onPress={() => showDatepicker()}>
                <Text style={styles.text}>Выбрать дату</Text>
            </Pressable>
        </View>
        <Text style={styles.selected}>выбрано: {converterDate(date)}</Text>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                themeVariant="dark"
                locale="ru-RU"
                minimumDate={new Date()}
            />
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "#fff",
        textDecorationLine: "underline",
        paddingBottom: 15
    },
    selected: {
        color: "#ccc",
        textAlign: "center"
    }
})

export default DatePickerComponent