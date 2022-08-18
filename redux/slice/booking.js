import { createSlice } from '@reduxjs/toolkit'

function converterDate(date) {
    const newDate = new Date(date);
    let res = [
        addLeadZero(newDate.getDate()),
        addLeadZero(newDate.getMonth() + 1),
        newDate.getFullYear(),
    ].join(".");
    function addLeadZero(val) {
        if (+val < 10) return "0" + val;
        return val;
    }
    return res;
}

export const confirmSlice = createSlice({
    name: 'booking',
    initialState: {
        type: null,
        id: null,
        date: null,
        startTime: null,
        endTime: null,
        name: null,
        phone: null,
        timeSettings: null,
        free: null,
        price: null,
    },
    reducers: {
        setType: (state, action) => {
            state.type = action.payload
        },
        setObjectIDHook: (state, action) => {
            state.id = action.payload
        },
        setObjectDateHook: (state, action) => {
            state.date = converterDate(action.payload)
        },
        setFree: (state, action) => {
            state.free = action.payload
        },
        book: (state, action) => {
            state.startTime = action.payload
            state.endTime = action.payload
        },
        resetBooking: (state) => {
            state.type = null
            state.id = null
            state.date = null
            state.startTime = null
            state.endTime = null
            state.name = null
            state.phone = null
            state.timeSettings = null
            state.free = null
            state.price = null
        }
    }
})

const { actions, reducer } = confirmSlice

export const { setType, setDate, setObjectIDHook, setObjectDateHook, setFree, book, resetBooking } = actions

export default reducer