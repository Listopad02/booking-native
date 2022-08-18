import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions, ScrollView} from "react-native";
import Map from './Map';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPage } from "../redux/slice/confirmSlice";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../api/api";
import {setCoefficientSize, setMap} from "../redux/slice/map";
import ObjectMap from "./ObjectMap";
import WholeTimeLine from './WholeTimeLine';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import Loader from "./Loader";
import {setLoading} from "../redux/slice/bookingDB";

const Playstation = ({ navigation }) => {
    let deviceWidth = Dimensions.get('window').width >= 600 ? 600 : Dimensions.get('window').width * 0.9;
    const dispatch = useAppDispatch()
    const userCollectionRef = collection(db, 'developMap')
    const loading = useAppSelector(state => state.bookingDB.loading)
    const [maps, setMaps] = useState({})
    useEffect(() => {
        dispatch(setPage('billiards'))
    })

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
            .catch(err => {
                console.log(err)
            })
    }, [])


    let arr = Array.from(maps)

    const addTableBR = () => {
        dispatch(setLoading(true))
        const res = []
        arr.map(el => {
            if (el.config.id === 'main_hall') {
                res.push(el)
            }
        })
        res.map(el => {
            const arr2 = el.config.objects
            for( let key of Object.keys(arr2)) {
                // res2.push(arr2[key])
                dispatch(setMap(arr2[key]))
                dispatch(setLoading(false))
            }
            dispatch(setCoefficientSize(deviceWidth / el.config.mapWidth))
        })
    }

    useEffect(() => {
        addTableBR()
    }, [maps])


    useEffect(() => {
        dispatch(setPage('playstation'))
    })

    return (
        <View style={styles.container}>
            <Text style={styles.header}>PLAYSTATION</Text>
            <Map navigation={navigation} />
            <WholeTimeLine />
            {loading ? <Loader /> :
                <View style={{
                    width: Dimensions.get('window').width > 500 ? wp('100%') : wp('85%'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'relative',
                    marginTop: 30
                }}>
                    {map.map((e, i) => {
                        if (e.type !== 'billiards') {
                            return (
                                <ObjectMap
                                    key={i}
                                    object={e}
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

export default Playstation