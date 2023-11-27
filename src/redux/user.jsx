import {createSlice} from '@reduxjs/toolkit';

const initialState = {};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPin: (prevState, action) => {
      const state = {pin: action.payload.pin};
      return state;
    },
  },
});

const userReducer = userSlice.reducer;

const {setPin} = userSlice.actions;

export {setPin, userReducer};
