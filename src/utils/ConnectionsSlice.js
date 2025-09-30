import { createSlice } from "@reduxjs/toolkit";
const connectionslice =createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addconnections:(state,action)=>action.payload,
        removeConnections:()=>null,
    },
})
export const {addconnections,removeConnections}=connectionslice.actions;
export default connectionslice.reducer;