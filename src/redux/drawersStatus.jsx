import {createSlice} from '@reduxjs/toolkit';

const initialState = {};
const drawersStatusSlice = createSlice({
  name: 'drawersStatus',
  initialState,
  reducers: {
    openTransactionsDrawer: (prevState, action) => {
      return {...prevState, transactionsDrawer: true};
    },
    closeTransactionsDrawer: (prevState, action) => {
      return {...prevState, transactionsDrawer: false};
    },
    openTransfersDrawer: (prevState, action) => {
      return {...prevState, transfersDrawer: true};
    },
    closeTransfersDrawer: (prevState, action) => {
      return {...prevState, transfersDrawer: false};
    },
    openAccountsDrawer: (prevState, action) => {
      return {...prevState, accountsDrawer: true};
    },
    closeAccountsDrawer: (prevState, action) => {
      return {...prevState, accountsDrawer: false};
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
} = drawersStatusSlice.actions;

export {
  openTransactionsDrawer,
  closeTransactionsDrawer,
  openTransfersDrawer,
  closeTransfersDrawer,
  openAccountsDrawer,
  closeAccountsDrawer,
  drawersStatusReducer,
};
