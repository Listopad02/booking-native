import React, {useEffect, useState} from 'react'
import {
    Text,
    View,
    Pressable,
    StyleSheet,
    TouchableHighlight, Alert, BackHandler
} from "react-native";
import DatePickerComponent from './DatePickerComponent';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setClearArr, setPrice, setRes, setResPrice, setStarts, setTable} from "../redux/slice/confirmSlice";
import {deleteMap, clearTableId, setSettings, setObject} from '../redux/slice/map';
import { setDeleteState } from '../redux/slice/confirmSlice'
import Toast from 'react-native-toast-message';
import {useRoute} from "@react-navigation/native";

const Map = ({ navigation }) => {
    const cellId = useAppSelector(state => state.map.tableId)
    const dispatch = useAppDispatch()
    const settings = useAppSelector(state => state.map.settings)
    const obj = useAppSelector(state =>  state.map.object)
    const resPrice = useAppSelector(state => state.confirm.resPrice)
    const res = useAppSelector(state => state.confirm.res)

    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ]

    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Выберите место для бронирования!',
        });
    }

    const handleDays = () => {
        const day = new Date().getDay();
        return days[day]
    }
    const addPrice = () => {
        settings.map(el => {
            if(el.type === 'price') {
                dispatch(setResPrice(el))
            }
        })
        const d = handleDays()
        if(obj !== null) {
            for (let key of Object.keys(resPrice)) {
                if(obj.priceSettingsType === key) {
                    dispatch(setRes(resPrice[key]))

                }
            }

            for ( let key of Object.keys(res) ) {
                if(d === key) {
                    dispatch(setPrice(res[key]))
                }
            }
        }
    }


    const backAction = () => {
        dispatch(setClearArr())
        dispatch(setStarts(1))
        navigation.navigate('Home')
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    useEffect(() => {
        addPrice()
        dispatch(setClearArr())
    }, [obj])

  return (
    <View style={styles.container}>
        <View style={{ position: "absolute", top: -110 }}>
            <Toast />
        </View>
        <TouchableHighlight style={styles.buttonBack} onPress={() => {
            dispatch(setClearArr())
            dispatch(setStarts(1))
            navigation.navigate('Home')
            dispatch(deleteMap())
        }}>
            <Text style={styles.text}>Назад</Text>
        </TouchableHighlight>
        <View>
        <TouchableHighlight style={{ width: 160 }}>
            <DatePickerComponent />
        </TouchableHighlight>
        </View>
        <Pressable style={styles.buttonNext}
            onPress={() => {
                if (cellId === 0) {
                    showToast()
                } else {
                    navigation.navigate('confirm')
                    addPrice()
                }
            }}>
            <Text style={styles.text}>Далее</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonBack: {
        marginRight: 20,
        borderWidth: 1,
        borderColor: "#fff",
        color: "#fff",
        borderRadius: 50,
        padding: 10,
    },
    buttonNext: {
        marginLeft: 20,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 50,
        padding: 10,
    },
    calendar: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 20,
        padding: 10,
        color: "#fff",
    },
    text: {
        color: "#fff"
    }
})

export default Map