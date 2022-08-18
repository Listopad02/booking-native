import { createSlice } from '@reduxjs/toolkit'

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
       map: [],
       coefficientSize: 0,
       tableId: 0,
       object: null,
       settings: {},
       orders: {}
    },
    reducers: {
        setMap: (state, actions) => {
            state.map.push(actions.payload)
        },
        setCoefficientSize: (state, actions) => {
            state.coefficientSize = actions.payload
        },
        deleteMap: (state) => {
            state.object = null
            state.map = []
        },
        setTableId: (state, actions) => {
            state.tableId = actions.payload
        },
        clearTableId: (state) => {
            state.tableId = 0
        },
        setObject: (state, actions) => {
           state.object = actions.payload
        },
        setSettings: (state, action) => {
            state.settings = action.payload
        },
        setOrders: (state, action) => {
            state.orders = action.payload
        }
    }
})

const { actions, reducer } = mapSlice

export const { setMap, setCoefficientSize, setTableId, 
               deleteMap, setObject, clearTableId, setSettings, setOrders } = actions

export default reducer