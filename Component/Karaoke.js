import React, {useEffect, useState} from 'react'
import { Image, Button, Text, View, TextInput, Pressable, StyleSheet, ScrollView, Dimensions } from "react-native";
import Map from './Map';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTable, setDate, setPage, setTitle, setPrice } from "../redux/slice/confirmSlice";
import FreeTimeLine from './FreeTimeLine';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../api/api";
import {deleteMap, setCoefficientSize, setMap} from '../redux/slice/map'
import ObjectMap from './ObjectMap';
import WholeTimeLine from './WholeTimeLine';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import Loader from "./Loader";
import {setLoading} from "../redux/slice/bookingDB";

const Karaoke = ({ navigation, tableId }) => {
    let deviceWidth = Dimensions.get('window').width >= 600 ? 600 : Dimensions.get('window').width * 0.9;
    const userCollectionRef = collection(db, 'developMap')
    const dispatch = useAppDispatch()
    const [selectedTable, setSelectedTable] = useState(tableId)
    const [floor, setFloor] = useState(1)
    const [maps, setMaps] = useState({})
    const loading = useAppSelector(state => state.bookingDB.loading)
    useEffect(() => {
        dispatch(setPage('karaoke'))
    })

    const handleFloor = (floor) => {
        setFloor(floor)
    }

    const map = useAppSelector(state => state.map.map) 

    useEffect(() => {
        const getMap = async () => {
            const data = await ( getDocs(userCollectionRef))
            setMaps(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        getMap()
            .then(() => {
                dispatch(setLoading(true))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    let arr = Array.from(maps)
    const addTableBR = () => {
        dispatch(setLoading(true))
        const res = []
        const a = floor === 1 ? 'karaoke_first_floor' : 'karaoke_second_floor'
        dispatch(deleteMap())
        arr.map(el => {
            if (el.id === a) {
                res.push(el)
            }
        })
        res.map(el => {
            const arr2 = el.objects
            for (let key of Object.keys(arr2)) {
                dispatch(setMap(arr2[key]))
                dispatch(setLoading(false))
            }
            dispatch(setCoefficientSize(deviceWidth / el.config.mapWidth))
        })
    }

    useEffect(() => {
        addTableBR()
    }, [maps, floor])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>KARAOKE</Text>
            <Map navigation={navigation} tableId={selectedTable} />
            <WholeTimeLine />
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                <Text style={{ color: 'white', marginRight: 10, fontSize: 17  }}>Этаж</Text>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 100,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5
                }}
                onPress={() => {
                    handleFloor(1)
                }}
                >
                    <Text style={{ color: 'white'}}>1</Text>
                </Pressable>
                <Pressable style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 100,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5
                }}
                   onPress={() => {
                       handleFloor(2)
                   }}>
                    <Text style={{ color: 'white' }}>2</Text>
                </Pressable>
            </View>
            {loading ? <Loader /> :
                <View style={{
                    width: Dimensions.get('window').width > 500 ? wp('100%') : wp('85%'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'relative',
                    marginTop: 30
                }}>
                    {map.map((e, i) => {
                        if (e.type !== 'biliards') {
                            return (
                                <ObjectMap
                                    key={i}
                                    object={e}
                                    // coefficientSize={coefficientSize}
                                />
                            );
                        }
                    })}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        width: '100%',
        height: '100%',
        paddingTop: 100,
        alignItems: "center"
    },
    header: {
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        paddingBottom: 55
    },
    text: {
        color: "#fff",
        marginTop: 30
    },
    green: {
        color: '#189c15'
    }
})

export default Karaoke