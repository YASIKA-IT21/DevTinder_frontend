import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedslice';
import ConnectionReducer from "./ConnectionsSlice";
import RequestReducer from "./requestSlice";
const Appstore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        connection:ConnectionReducer,
        request:RequestReducer
    },
});

export default Appstore;