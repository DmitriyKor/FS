import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, { type AxiosResponse } from 'axios';

import type { IUserPassword, IUserData, IUser } from './interfaces.ts';
import { API_URL } from '../const.ts';

const initialState: IUser = {
  data: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    console.log('fetch user:')
    const response = await axios(API_URL+'/users/1');
   
    console.log(response.data);
    return response.data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      console.log('setUser: ');
      console.log(action.payload);
      state.data = action.payload;
    },
    resetUser: (state)=>{
      state.data = null;
    }
  },
 extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;        
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.data = null;
      })
      ;
  }

});

export const { setUser, resetUser } = userSlice.actions;
export type { IUser, IUserData } from './interfaces';
export default userSlice.reducer;