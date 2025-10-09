import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addrequest: (state, action) => action.payload,
    removerequest:(state,action)=> {
      const newArray=state.filter(r=>r._id!== action.payload);
      return newArray
    }
  },
});

export const { addrequest,removerequest} = requestSlice.actions;
export default requestSlice.reducer;
