// +bookingId
import { Text, Pressable } from 'react-native'
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTableId, setObject } from "../redux/slice/map";
import { setObjectIDHook, setObjectDateHook } from "../redux/slice/booking"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function ObjectMap({ object }) {
   const coefficientSize = useAppSelector(state => state.map.coefficientSize)
   const dispatch = useAppDispatch()
   const tableId = useAppSelector(state => state.map.tableId)
   const target = () => {
     if( object.type !== 'static') {
         dispatch(setTableId(object.id))
         dispatch(setObject(object))
         dispatch(setObjectIDHook(object.id))
         setPress(!press)
     }
   }
    const [press, setPress] = useState(false)

  return (
    <Pressable style={{
        width: object.location.width * coefficientSize,
        height: object.location.height * coefficientSize,
        top: object.location.startY * coefficientSize,
        left: object.location.startX * coefficientSize,
        backgroundColor: tableId === object.id ? "#189c15" : "#484848",
        borderRadius: 10,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}
      onPress={() => {
          target()
      }}
    >
        <Text style={{ color: 'white', fontSize: hp('1.2%') }}>{object.name}</Text>
        {object.guestCapacity && <Text style={{color: 'white', fontSize: hp('1.5%')}}>Мест: {object.guestCapacity}</Text>}
    </Pressable>
  );
}



export default ObjectMap
