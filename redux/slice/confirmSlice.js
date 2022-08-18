import { createSlice } from '@reduxjs/toolkit'

export const confirmSlice = createSlice({
    name: 'confirm',
    initialState: {
        page: '',
        title: '',
        date: '',
        table: '',
        price: '0',
        resPrice: {},
        res: {},
        resArr: [],
        endResArr: [],
        start: 0
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setTable: (state, action) => {
            state.table = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setResPrice: (state, actions) => {
            state.resPrice = actions.payload
        },
        setRes: (state, actions) => {
            state.res = actions.payload
        },
        setDeleteState: (state) => {
            state.page = ''
            state.title =''
            state.date = ''
            state.table =''
            state.price ='0'
            state.resPrice = {}
            state.res= {}
            state.resArr = []
            state.endResArr = []
        },
        setResArr: (state, actions) => {
            state.resArr.push(actions.payload)
        },
        setEndResArr: (state, actions) => {
            state.endResArr.push(actions.payload)
        },
        setStarts: (state, actions) => {
            state.start = actions.payload
        },
        setClearArr: (state) => {
          state.resArr = []
          state.endResArr = []
        }
    }
})

const { actions, reducer } = confirmSlice

export const {
    setPage,
    setTitle,
    setTable,
    setDate,
    setPrice,
    setResPrice,
    setRes,
    setDeleteState,
    setResArr,
    setEndResArr,
    setStarts,
    setClearArr
} = actions

export default reducer