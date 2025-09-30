import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedslice';
import ConnectionReducer from "./ConnectionsSlice";
const Appstore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        connection:ConnectionReducer
    },
});

export default Appstore;