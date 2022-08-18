import React from 'react'
import { Image, Button, Text, View, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";

const Success = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.primary}>Оплата была отменена</Text>
        <Pressable onPress={() => navigation.navigate('Home')}>
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