import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import type {IHistoryItem, IHistoryId, IHistory} from './interfaces.ts';

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async () => {
    const response = await axios('http://localhost:3005/history');
    return response.data;
  }
)

export const addHistory = createAsyncThunk(
  'history/addHistory',
  async (data : IHistoryItem) => {
    delete data.id;
    const response = await axios.post('http://localhost:3005/history', JSON.stringify(data));
    return response.data;
  }
)

const initialState: IHistory = {
    items: [],
    isLoading: false,
    error: "",
} satisfies IHistory as IHistory;

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addOrSetHistoryItem: (state, action: PayloadAction<IHistoryItem>) => {            
            const idx: number = (action.payload.id === null)? 
                -1: state.items.findIndex((el) => el.id === action.payload.id);
            if (idx < 0) {
                state.items.push({...action.payload, id: uuidv4()});
            } else {
                const current_id = state.items[idx].id;
                state.items[idx] = { ...action.payload, id: current_id}
            }
        },
        deleteHistoryItem: (state, action: PayloadAction<IHistoryId>) => {
            const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
            if (idx >=0) {
                state.items = state.items.filter((el) => el.id !== action.payload.id)
            }   
        },
        clearHistory: (state) => {
            state = initialState;  
        }
    },
    extraReducers: (builder) => {
            builder
              .addCase(fetchHistory.pending, (state) => { state.isLoading = true })
              .addCase(fetchHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log('history fulfilled:')
                console.log(action.payload);
                state.items = action.payload;
              })
              .addCase(fetchHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
              })
              .addCase(addHistory.fulfilled, (state, action) => {
                console.log('history added. Response is:')
                console.log(action.payload);
              })
              ;
          }
})

export const { addOrSetHistoryItem, deleteHistoryItem, clearHistory } = historySlice.actions;
export default historySlice.reducer;
export * from './interfaces.ts'