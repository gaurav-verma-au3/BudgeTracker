import {createSlice} from '@reduxjs/toolkit';

const initialState = {};
const drawersStatusSlice = createSlice({
  name: 'drawersStatus',
  initialState,
  reducers: {
    openTransactionsDrawer: (prevState, action) => {
      return {
        transactionsDrawer: true,
        transfersDrawer: false,
        accountsDrawer: false,
        colorPickerDrawer: false,
      };
    },
    closeTransactionsDrawer: (prevState, action) => {
      return {...prevState, transactionsDrawer: false};
    },
    openTransfersDrawer: (prevState, action) => {
      return {
        transfersDrawer: true,
        accountsDrawer: false,
        transactionsDrawer: false,
        colorPickerDrawer: false,
      };
    },
    closeTransfersDrawer: (prevState, action) => {
      return {...prevState, transfersDrawer: false};
    },
    openAccountsDrawer: (prevState, action) => {
      return {
        accountsDrawer: true,
        transfersDrawer: false,
        transactionsDrawer: false,
        colorPickerDrawer: false,
      };
    },
    closeAccountsDrawer: (prevState, action) => {
      return {...prevState, accountsDrawer: false};
    },
    openColorPickerDrawer: (prevState, action) => {
      return {
        colorPickerDrawer: true,
        accountsDrawer: false,
        transfersDrawer: false,
        transactionsDrawer: false,
      };
    },
    closeColorPickerDrawer: (prevState, action) => {
      return {...prevState, colorPickerDrawer: false};
    },
  },
});

const drawersStatusReducer = drawersStatusSlice.reducer;

const {
  openTransactionsDrawer,
  closeTransactionsDrawer,
  openTransfersDrawer,
  closeTransfersDrawer,
  openAccountsDrawer,
  closeAccountsDrawer,
  openColorPickerDrawer,
  closeColorPickerDrawer,
} = drawersStatusSlice.actions;

export {
  openTransactionsDrawer,
  closeTransactionsDrawer,
  openTransfersDrawer,
  closeTransfersDrawer,
  openAccountsDrawer,
  closeAccountsDrawer,
  openColorPickerDrawer,
  closeColorPickerDrawer,
  drawersStatusReducer,
};
