import { configureStore } from '@reduxjs/toolkit';
import { toastSlice } from 'redux/toastSlice';

export const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
