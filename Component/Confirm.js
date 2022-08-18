import React, { useEffect, useState } from 'react'
import {Text, View, TextInput, Pressable, StyleSheet, ScrollView, BackHandler} from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, addDoc} from "firebase/firestore";
import { db } from "../api/api";
import { setResArr, setEndResArr, setClearArr, setStarts } from "../redux/slice/confirmSlice";
import Toast from 'react-native-toast-message';

const Confirm = ({ navigation  }) => {
    const regExpValidPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    const dateToday = useAppSelector(state => state.confirm.date)
    const obj = useAppSelector(state => state.map.object)
    const price = useAppSelector(state => state.confirm.price)
    const resArr = useAppSelector(state => state.confirm.resArr)
    const endResArr = useAppSelector(state => state.confirm.endResArr)
    const free = useAppSelector(state => state.booking.free)
    const settings = useAppSelector(state => state.map.settings)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const userCollectionRef = collection(db, 'settings')
    const newBookingCollectionRef = collection(db, 'future')

    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ]
    const dispatch = useAppDispatch()

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

    const showToastName = () => {
        Toast.show({
            type: 'error',
            text1: 'Проверьте правильность своего имени!'
        });
    }
    const showToastPhone = () => {
        Toast.show({
            type: 'error',
            text1: 'Проверьте номер своего телефона!',
        });
    }
    const showToastRange = () => {
        Toast.show({
            type: 'error',
            text1: 'Выберите время для бронирования!',
        });
    }

    const handleDays = () => {
        const day = new Date().getDay();
        return days[day]
    }



    useEffect(() => {
        const getSetting = async () => {
            const data = await ( getDocs(userCollectionRef))
            setSettings(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }
        getSetting()
    }, [])
    const [reload, setReload] = useState(0)
    let a = 0

    const addTimeToArr = (time) => {
        if(time / 60 < 24) {
            if ( time % 60 === 0 ) {
                return time / 60 + ':00'
            }
            else if (time % 60 !== 0) {
                const q =(time / 60).toString()
                return q.split('.')[0] + ':30'
            }
        }
        else {
            if ( time % 60 === 0 ) {
                return (time / 60) - 24 + ':00'
            }
            else if (time % 60 !== 0) {
                const q =((time / 60) - 24).toString()
                return q.split('.')[0] + ':30'
            }
        }
    }
    const startTime = () => {
        // dispatch(setClearArr())
        setReload(reload + 1)
        const d = handleDays()
        const gg = []
        a = settings.map(el => {
            if(el.type === 'time') {
                return el           }
        })
            .filter(Boolean)
            .filter(el => {
                let sTime = 0
                for(let key of Object.keys(el)) {
                    if (key === obj.timeSettingsType) {
                        sTime = el[key].timetable[d]
                    }
                }
                for (let i = sTime.startWorkTime; i <= sTime.startWorkTime + sTime.workTimeDuration - 60; i = i + 30) {
                    gg.push(i)
                }
                free.map(el => {
                    gg.filter(e => {
                        if(el[0] < e && e <= el[1]) {
                            dispatch(setResArr({ label: addTimeToArr(e), value: e, color: 'green'}))
                        }
                    })
                })
            })
    }

    const endTime = () => {
        const datatest = handleDays()
        if (start !== null) {
            a = settings.map(el => {
                if(el.type === 'time') {
                    return el           }
            })
                .filter(Boolean)
                .filter(el => {
                    let sTime = 0
                    for(let key of Object.keys(el)) {
                        if (key === obj.timeSettingsType) {
                            sTime = el[key].timetable[datatest]
                        }
                    }

                    let timeEnd = 0
                    free.forEach((el) => {
                        if (el[0] <= start && start <= el[1]) {
                            timeEnd = el[1];
                        }
                    });
                    for (let i = start + 60; i <= timeEnd; i += 30) {
                        dispatch(setEndResArr({ label: addTimeToArr(i), value: i, color: 'green'}))
                    }
                })
        }
    }

    useEffect(() => {
        if (resArr.length === 0 ) {
            startTime()
        }
    }, [obj, resArr])

    useEffect(() => {
        endTime()

    }, [start, reload])

    const postNewBooking = async () => {
        await addDoc(newBookingCollectionRef, {
            actualEndBookingTime: 0,
            actualStartBookingTime: 0,
            date: dateToday.split(',')[0],
            endTime: end,
            name: name,
            objectId: obj.id,
            phone: phone,
            startTime: start,
            status: "new",
            type: obj.type
        })
    }

    return (
        <View style={styles.container}>
            <View style={{position: "absolute", zIndex: 9999}}>
                <Toast />
            </View>
            <ScrollView>
                <Text style={styles.title}>{obj.type !== 'ps' ?  obj.type.toUpperCase() : 'PLAYSTATION 4 '}</Text>
                <Text style={styles.text}>{dateToday.split(',')[0]}</Text>
                <Text style={styles.text}>{obj.name}</Text>
                <Text style={{color: "#fff", marginBottom: 15}}>Время начала:</Text>
                <View style={styles.select}>
                    <RNPickerSelect
                        onValueChange={(value) => {
                            setStart(value)
                            setReload(reload + 1)
                        }}
                        placeholder={{
                            label: 'Время начала',
                            value: null,
                            color: 'black',
                        }}
                        placeholderTextColor="black"
                        items={resArr}
                    />
                </View>
                <Text style={{color: "#fff", marginTop: 15, marginBottom: 15}}>Время окончания:</Text>
                <View style={styles.select}>
                    <RNPickerSelect
                        onValueChange={(value) => setEnd(value)}
                        placeholder={{
                            label: 'Время окончания',
                            value: null,
                            color: 'black',
                            placeholderTextColor: 'black'
                        }}
                        placeholderTextColor="black"
                        items={endResArr}
                        disabled={start === null}
                    />
                </View>
                <TextInput
                    defaultValue={name}
                    onChangeText={newName => setName(newName)}
                    placeholder='Имя'
                    placeholderTextColor='white'
                    style={{
                        color: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 15,
                        height: 55,
                        paddingLeft: 10,
                        marginTop: 20
                    }}
                />
                <TextInput
                    defaultValue={phone}
                    onChangeText={newName => {
                        if (regExpValidPhone.test(newName)) {
                            setPhone(newName)
                        }}}
                    placeholder='Телефон'
                    placeholderTextColor='white'
                    style={{
                        color: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 15,
                        height: 55,
                        paddingLeft: 10,
                        marginTop: 20
                    }}
                />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.span}>{obj.type !== 'karaoke' ? 'Стоимость 1 часа' : 'Депозит'} - </Text>
                    <Text style={styles.price}>{price} P</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={styles.span}>Услуга бронирования - </Text>
                    <Text style={styles.price}>100P</Text>
                </View>
                <View style={styles.btnContainer}>
                    <Pressable
                        style={styles.btn}
                        onPress={() => {
                            navigation.navigate('Home')
                            dispatch(setStarts(1))
                        }}
                    >
                        <Text style={styles.textBtn}>Назад</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btn}
                        onPress={() => {
                            if (phone && name.length >= 3 && start && end) {
                                postNewBooking()
                                .then(() => {
                                    navigation.navigate('success')
                                })
                                .catch((err) => {
                                })
                            } else if (name.length < 3) {
                                showToastName()
                            } else if (!phone) {
                                showToastPhone()
                            } else {
                                showToastRange()
                            }
                        }}
                    >
                        <Text style={styles.textBtn}>Забронировать</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        width: '100%',
        height: '100%',
        padding: 50,
        margin: 'auto',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        marginTop: 10
    },
    select: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
    },
    span: {
        color: 'white',
        textAlign: "center"
    },
    price: {
        color: 'green'
    },
    btnContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },
    textBtn: {
        color: 'white',
        fontSize: 20
    },
    btn: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }
})

export default Confirm