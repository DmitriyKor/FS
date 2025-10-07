import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import type { IHistoryItem, IHistoryId, IHistoryParams } from './types.ts';
import { API_URL } from '../const.ts';
import { HISTORY_ENDPOINT, initialState } from './const.ts';
import { authAxios } from '../../helpers/authAxios.ts';
import { setUser } from '../user/index.ts';

export const fetchHistory : any = createAsyncThunk(
  'history/fetchHistory',
  async (params: IHistoryParams, thunkAPI) => {    
    const response = await authAxios.instance(API_URL+HISTORY_ENDPOINT, {params});
    return response.data.history;
  }
)

export const setHistory : any = createAsyncThunk(
  'history/setHistory',
  async (data: IHistoryItem, {dispatch}) => {
    const {_id, ...dataToPost} = data;   
    const response = await authAxios.instance.patch(API_URL+HISTORY_ENDPOINT+'/'+_id, dataToPost);
    //refresh user
    dispatch(setUser(response.data.user))
    return {response: response.data, _id};
  }
)

export const addHistory : any = createAsyncThunk(
  'history/addHistory',
  async (data: IHistoryItem, {dispatch}) => {
    const response = await authAxios.instance.post(API_URL+HISTORY_ENDPOINT, data);
    //refresh user
    dispatch(setUser(response.data.user))
    return response.data.item;
  }
)

export const deleteHistory : any = createAsyncThunk(
  'history/deleteHistory',
  async (data: IHistoryId, {dispatch}) => {
    const response = await authAxios.instance.delete(API_URL+HISTORY_ENDPOINT+'/'+data._id);
    //refresh user
    dispatch(setUser(response.data.user))
    return {response: response.data, data};
  }
)

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state, action) => { 
        state.isLoading = true;
        state.params = action.meta.arg;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;              
        // console.log('fetchHistory.fulfilled   action.meta.arg=', action.meta.arg);
        // console.log('fetchHistory.fulfilled   action.payload=', action.payload);
        for (let i = 0; i < action.payload.items.length; i++) {
            state.items[action.meta.arg.from + i] = action.payload.items[i];
        }
        state.countTotal = action.payload.count;     
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        state.items.splice(0, 0, action.payload);
      })
      .addCase(setHistory.fulfilled, () => {
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload.data._id);
      })

      ;
  }
})

export const {} = historySlice.actions;
export default historySlice.reducer;
export * from './types.ts'