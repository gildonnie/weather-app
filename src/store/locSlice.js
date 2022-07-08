/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getResults = createAsyncThunk();
export const locSlice = createSlice({
  name: 'search',
  initialState: {
    location: 'Fresno, CA',
    input: '',
    locationName: '',
    weatherData: [],
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
    setData(state, { payload }) {
      state.weatherData = payload;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(getResults.pending, (state) => {
  //       state.loading = true;
  //       state.results = [];
  //       state.coords = [];
  //     })
  //     .addCase(
  //       getResults.fulfilled,
  //       (state, { payload: { lat, lon, cities } }) => {
  //         state.loading = false;
  //         state.error = false;
  //         state.coords = [lat, lon];
  //         state.results = cities;
  //       }
  //     )
  //     .addCase(getResults.rejected, (state) => {
  //       state.loading = false;
  //       state.error = true;
  //     });
  // },
});

export const { setLoc, setLocNa, setInput, setData } = locSlice.actions;
export default locSlice.reducer;
