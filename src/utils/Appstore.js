import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedslice';
const Appstore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer
    },
});

export default Appstore;