import React from 'react'
import { Text, View, Pressable, StyleSheet } from "react-native";
import {setClearArr, setStarts} from "../redux/slice/confirmSlice";
import {useAppDispatch} from "../redux/hooks";

const Success = ({ navigation }) => {
    const dispatch = useAppDispatch()
  return (
    <View style={styles.container}>
        <Text style={styles.primary}>Оплата произведена успешно!</Text>
        <Text style={styles.primary}>Ваш стол забронирован</Text>
        <Pressable onPress={() => {
            dispatch(setClearArr())
            dispatch(setStarts(1))
            navigation.navigate('Home')
        }}>
            <Text style={styles.secondary}>На главную</Text>
        </Pressable>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        width: '100%',
        height: '100%',
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center"
    },
    primary: {
        fontSize: 18,
        color: "#fff"
    },
    secondary: {
        fontSize: 14,
        color: "#ccc",
        textDecorationLine: "underline"
    }
})

export default Success