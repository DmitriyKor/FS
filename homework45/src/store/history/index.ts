import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import type { IHistoryItem, IHistoryId, IHistory } from './types.ts';
import { updateCategoriesBalance } from '../category/index.ts';
import { API_URL } from '../const.ts';
import { HISTORY_URI, initialState } from './const.ts';

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async (_, thunkAPI) => {
    const response = await axios(API_URL+HISTORY_URI);
    //recalculate categories while we mock the backend
    thunkAPI.dispatch(updateCategoriesBalance(response.data));
    return response.data;
  }
)

export const setHistory = createAsyncThunk(
  'history/setHistory',
  async (data: IHistoryItem, thunkAPI) => {
    const {id, ...dataToPost} = data;   
    const response = await axios.put(API_URL+HISTORY_URI+'/'+id, dataToPost);
    //refetch full history and recalulate categories there
    await thunkAPI.dispatch(fetchHistory()); 
  }
)

export const addHistory = createAsyncThunk(
  'history/addHistory',
  async (data: IHistoryItem, thunkAPI) => {
    const response = await axios.post(API_URL+HISTORY_URI, data);
    //refetch full history and recalulate categories there
    await thunkAPI.dispatch(fetchHistory()); 
  }
)

export const deleteHistory = createAsyncThunk(
  'history/deleteHistory',
  async (data: IHistoryId, thunkAPI) => {
    const response = await axios.delete(API_URL+HISTORY_URI+'/'+data.id);
    //refetch full history and recalulate categories there
    await thunkAPI.dispatch(fetchHistory()); 
  }
)

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // addOrSetHistoryItem: (state, action: PayloadAction<IHistoryItem>) => {
    //   const idx: number = (action.payload.id === null) ?
    //     -1 : state.items.findIndex((el) => el.id === action.payload.id);
    //   if (idx < 0) {
    //     state.items.push({ ...action.payload, id: uuidv4() });
    //   } else {
    //     const current_id = state.items[idx].id;
    //     state.items[idx] = { ...action.payload, id: current_id }
    //   }
    // },
    // deleteHistoryItem: (state, action: PayloadAction<IHistoryId>) => {
    //   const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
    //   if (idx >= 0) {
    //     state.items = state.items.filter((el) => el.id !== action.payload.id)
    //   }
    // },
    // clearHistory: (state) => {
    //   state = initialState;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => { state.isLoading = true })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;        
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
      })
      .addCase(setHistory.fulfilled, (state, action) => {
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
      })

      ;
  }
})

export const { addOrSetHistoryItem, deleteHistoryItem, clearHistory } = historySlice.actions;
export default historySlice.reducer;
export * from './types.ts'