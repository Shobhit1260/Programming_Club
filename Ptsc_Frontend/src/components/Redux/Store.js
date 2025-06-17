import {configureStore} from "@reduxjs/toolkit";
import eventReducer from './EventSlice'
export const store= configureStore({
    reducer:{
        event:eventReducer,
    }
})