import React from 'react'
import { Text, View, StyleSheet } from "react-native";

const FreeTimeLine = ({ widthContent, free, start, end }) => {
    const objectStyle = {
        marginTop: 25,
        marginRight: 20,
        height: 5,
        backgroundColor: "#189c15",
        width: ((free[1] - free[0]) / (end - start)) * widthContent
    };
    const objectStyle1 = {
        position: 'absolute',
        left: 0,
        color: "#fff"
    };
    const objectStyle2 = {
        position: 'absolute',
        left: ((free[1] - free[0]) / (end - start)) * widthContent - 30,
        color: "#fff"
    };
    
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        if (minutes === 0) minutes = "00";
        if (hours >= 24) hours -= 24;
        return hours + ":" + minutes;
    }
    
    return (
        <View style={{ marginLeft: 20 }}>
            <View style={objectStyle}>
                <View style={objectStyle1}>
                    <Text style={styles.text1}>
                        {getTimeFromMins(free[0])}
                    </Text>
                </View>
                <View style={objectStyle2}>
                    <Text style={styles.text2}>
                        {getTimeFromMins(free[1])}
                    </Text>
                </View>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    text1: {
        color: "#fff",
        // marginTop: 10,
        top: -20,
        left: -15,
        width: 40
    },
    text2: {
        color: "#fff",
        marginTop: 10,
        top: -3,
        width: 40,
        left: 15
    },
})

export default FreeTimeLine