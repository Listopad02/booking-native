import { createSlice } from '@reduxjs/toolkit'

export const confirmSlice = createSlice({
    name: 'bookingDB',
    initialState: {
        book: 0,
        loading: true
    },
    reducers: {
        loadBook: (state, action) => {
            state.book = action.payload
        },
        setLoading: (state, actions) => {
            state.loading = actions.payload
        }
    }
})

const { actions, reducer } = confirmSlice

export const { loadBook, setLoading } = actions

export default reducer