import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'redux/store';
import { ToastType } from 'types/Common';

// Defining our initialState's type
type InitialStateType = {
  isToastVisible: boolean;
  toastMessage: string;
  toastType?: ToastType;
};

const initialState: InitialStateType = {
  isToastVisible: false,
  toastMessage: '',
};

type ToastPayload = {
  message: string;
  type: ToastType;
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToastVisibility: (state, action: PayloadAction<boolean>) => {
      state.isToastVisible = action.payload;
    },
    toggleToastVisibility: (state) => {
      state.isToastVisible = !state.isToastVisible;
    },
    setToastMessage: (state, action: PayloadAction<ToastPayload>) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
      state.isToastVisible = true;
    },
  },
});

// To able to use reducers we need to export them.
export const { setToastVisibility, toggleToastVisibility, setToastMessage } = toastSlice.actions;

export function alert(message: string, type: ToastType, timeout = 5000) {
  return async (dispatch: AppDispatch) => {
    dispatch(setToastMessage({ message, type }));

    setTimeout(() => dispatch(setToastVisibility(false)), timeout);
  };
}

export default toastSlice.reducer;
