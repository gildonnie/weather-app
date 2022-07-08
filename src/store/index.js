import { configureStore } from '@reduxjs/toolkit';
// import themeReducer from './themeSlice';
import locReducer from './locSlice';
import cardReducer from './cardSlice';
// import countReducer from './countSlice';

export default configureStore({
  reducer: {
    loc: locReducer,
    card: cardReducer,
  },
});
