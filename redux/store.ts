import { configureStore } from '@reduxjs/toolkit';
import confirm from "./slice/confirmSlice.js"
import booking from './slice/booking'
import bookingDB from './slice/bookingDB'
import map from "./slice/map"

export const store = configureStore({
    reducer: {
        confirm,
        booking,
        bookingDB,
        map
    },

    devTools: process.env.MODE !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
