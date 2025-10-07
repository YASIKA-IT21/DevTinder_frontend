import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addrequest: (state, action) => action.payload,
  },
});

export const { addrequest } = requestSlice.actions;
export default requestSlice.reducer;
