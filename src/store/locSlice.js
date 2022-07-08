/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const locSlice = createSlice({
  name: 'user',
  initialState: {
    location: 'Fresno, CA',
    input: '',
    locationName: '',
  },
  reducers: {
    setLoc(state, { payload }) {
      state.location = payload;
    },
    setLocNa(state, { payload }) {
      state.locationName = payload;
    },
    setInput(state, { payload }) {
      state.input = payload;
    },
  },
});

export const { setLoc, setLocNa, setInput } = locSlice.actions;
export default locSlice.reducer;
