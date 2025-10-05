import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';


import type { IHistoryItem, IHistoryId } from './types.ts';
import { updateCategoriesBalance } from '../category/index.ts';
import { API_URL } from '../const.ts';
import { HISTORY_URI, initialState } from './const.ts';
import { authAxios } from '../../helpers/authAxios.ts';


export const fetchHistory : any = createAsyncThunk(
  'history/fetchHistory',
  async (filter, thunkAPI) => {    
    const response = await authAxios.instance(API_URL+HISTORY_URI, {
      params: {
        filter: filter,
      }});
    //recalculate categories while we mock the backend
    //thunkAPI.dispatch(updateCategoriesBalance(response.data));
    return response.data.history;
  }
)

export const setHistory : any = createAsyncThunk(
  'history/setHistory',
  async (data: IHistoryItem, thunkAPI) => {

    
    const {_id, ...dataToPost} = data;   
    const response = await authAxios.instance.patch(API_URL+HISTORY_URI+'/'+_id, dataToPost);
    //refetch full history and recalulate categories there
    //await thunkAPI.dispatch(fetchHistory()); 
    // console.log('setHistory response:');
    // console.log(response);
    return {response: response, _id};
  }
)

export const addHistory : any = createAsyncThunk(
  'history/addHistory',
  async (data: IHistoryItem, thunkAPI) => {
    const response = await authAxios.instance.post(API_URL+HISTORY_URI, data);
    return response.data.item;
  }
)

export const deleteHistory : any = createAsyncThunk(
  'history/deleteHistory',
  async (data: IHistoryId, thunkAPI) => {
    console.log(data);
    const response = await authAxios.instance.delete(API_URL+HISTORY_URI+'/'+data._id);
    //refetch full history and recalulate categories there
    // const state : unknown = thunkAPI.getState(); 
    // await thunkAPI.dispatch(fetchHistory(state.filter)); 
    return {response, data};
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
      .addCase(fetchHistory.pending, (state, action) => { 
        state.isLoading = true;
        state.filter = action.meta.arg;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items; 
        state.countTotal = action.payload.count;     
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        console.log('addHistory state.items=', state.items);
        console.log('addHistory action.payload=', action.payload);
        state.items.splice(0, 0, action.payload);
      })
      .addCase(setHistory.fulfilled, () => {
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        console.log('deleteHistory state.items=', state.items);
        console.log('deleteHistory action.payload=', action.payload);
        state.items = state.items.filter(item => item._id !== action.payload.data._id);
      })

      ;
  }
})

export const {} = historySlice.actions;
export default historySlice.reducer;
export * from './types.ts'