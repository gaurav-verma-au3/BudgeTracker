import {createSlice} from '@reduxjs/toolkit';

const initialState = '#a35905';
const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState,
  reducers: {
    setThemeColor: (prevState, action) => {
      const state = action.payload.color;
      return state;
    },
  },
});

const themeColorReducer = themeColorSlice.reducer;

const {setThemeColor} = themeColorSlice.actions;

export {setThemeColor, themeColorReducer};
