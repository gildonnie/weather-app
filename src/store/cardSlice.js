/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
  name: 'data',
  initialState: {
    cardData: {},
    background: '',
  },
  reducers: {
    setCard(state, { payload }) {
      state.cardData = payload;
    },
    setBack(state, { payload }) {
      state.background = payload;
    },
  },
});

export const { setCard, setBack } = cardSlice.actions;
export default cardSlice.reducer;
