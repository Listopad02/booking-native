import React, { useEffect } from 'react'
import { Image, Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {deleteMap, setSettings, clearTableId, setObject, setTableId} from "../redux/slice/map";
import { setDeleteState, setStarts } from "../redux/slice/confirmSlice";
import {resetBooking, setType} from "../redux/slice/booking";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/api";
import { useRoute } from "@react-navigation/native";

const StartScreen = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const route = useRoute()
    const start = useAppSelector(state => state.confirm.start)
    useEffect(() => {
        if(route.name === 'Home') {
            dispatch(deleteMap())
            dispatch(setDeleteState())
            dispatch(resetBooking())
        }

    }, [])

    useEffect(() => {
        if (start === 1) {
            dispatch(setObject(null))
            dispatch(setStarts(0))
            dispatch(setTableId(null))
            dispatch(deleteMap())
            dispatch(setDeleteState())
            dispatch(resetBooking())
        }
    }, [start])


    const settingsCollectionRef = collection(db, 'settings')

    useEffect(() => {
        const getSetting = async () => {
            const data = await ( getDocs(settingsCollectionRef))
            dispatch(setSettings(data.docs.map(doc => ({...doc.data(), id: doc.id}))))
        }
        getSetting()
    }, [])
    return (
        <View style={styles.container} >
            <ScrollView style={styles.box}>
                <Text style={styles.text}>SMARTBOOKING</Text>

                <View style={styles.boxLink}>
                    <Pressable
                        style={{marginLeft: 10, marginRight: 'auto'}}
                        onPress={() => {
                            navigation.navigate('billiards')
                            dispatch(setType('biliards'))
                            dispatch(clearTableId())
                        }}
                    >
                        <Image source={{
                            uri: 'https://frantsuz-club.ru/static/media/billiard.e5962f76defa495c39d8.png'
                        }}
                               style={{ width: wp('45%'), height: hp('28%'),  }}
                        />
                    </Pressable>
                    <Pressable
                        style={{marginLeft: 'auto', marginRight: 10}}
                        onPress={() => {
                            navigation.navigate('karaoke')
                            dispatch(setType('karaoke'))
                            dispatch(clearTableId())
                        }}
                    >
                        <Image source={{
                            uri: 'https://frantsuz-club.ru/static/media/karaoke.408d0e1e615d74e816b2.png'
                        }}
                               style={{width: wp('45%'), height: hp('28%'), marginLeft: 'auto', marginRight: 0 }}
                        />
                    </Pressable>
                </View>
                <Pressable
                    style={styles.btn_play}
                    onPress={() => {
                        navigation.navigate('playstation')
                        dispatch(setType('ps'))
                        dispatch(clearTableId())
                    }}
                >
                    <Image source={{
                        uri: 'https://frantsuz-club.ru/static/media/ps.ad9667e65144c7a629ba.png'
                    }}
                           style={{ width: wp('95%'), height: hp('20%'), marginLeft: 'auto', marginRight: 'auto'}}
                    />
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        backgroundColor: '#222',
        width: '100%',
        height: '100%',
        paddingTop: 150,
        margin: 'auto',
    },
    boxLink: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        marginBottom: 20,

    },
    btn: {
        background: 'none',
    },
    btn_play: {
        // width: '100%',
    }

})

export default StartScreen