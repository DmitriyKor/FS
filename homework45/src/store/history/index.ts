import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';


import type { IHistoryItem, IHistoryId } from './types.ts';
import { updateCategoriesBalance } from '../category/index.ts';
import { API_URL } from '../const.ts';
import { HISTORY_URI, initialState } from './const.ts';
import { authAxios } from '../../helpers/authAxios.ts';


export const fetchHistory : any = createAsyncThunk(
  'history/fetchHistory',
  async (_, thunkAPI) => {
    const response = await authAxios.instance(API_URL+HISTORY_URI);
    //recalculate categories while we mock the backend
    thunkAPI.dispatch(updateCategoriesBalance(response.data));
    return response.data;
  }
)

export const setHistory : any = createAsyncThunk(
  'history/setHistory',
  async (data: IHistoryItem, thunkAPI) => {
    const {id, ...dataToPost} = data;   
    await authAxios.instance.put(API_URL+HISTORY_URI+'/'+id, dataToPost);
    //refetch full history and recalulate categories there
    await thunkAPI.dispatch(fetchHistory()); 
  }
)

export const addHistory : any = createAsyncThunk(
  'history/addHistory',
  async (data: IHistoryItem, thunkAPI) => {
    await authAxios.instance.post(API_URL+HISTORY_URI, data);
    //refetch full history and recalulate categories there
    await thunkAPI.dispatch(fetchHistory()); 
  }
)

export const deleteHistory : any = createAsyncThunk(
  'history/deleteHistory',
  async (data: IHistoryId, thunkAPI) => {
    await authAxios.instance.delete(API_URL+HISTORY_URI+'/'+data.id);
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
      .addCase(addHistory.fulfilled, () => {
      })
      .addCase(setHistory.fulfilled, () => {
      })
      .addCase(deleteHistory.fulfilled, () => {
      })

      ;
  }
})

export const {} = historySlice.actions;
export default historySlice.reducer;
export * from './types.ts'