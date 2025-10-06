import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import type { IUserData, IUser } from './interfaces.ts';
import { API_URL } from '../const.ts';
import { authAxios } from '../../helpers/authAxios.ts';
import { ENDPOINT_USER } from './const.ts';

const initialState: IUser = {
  data: null,
}

 // "email":"john@gmail.com",
 // "password": "yryU&77i",

 //aaa@
 //qW1234%a

export const fetchUser : any = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await authAxios.instance(API_URL + ENDPOINT_USER);
    return response.data.user;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.data = action.payload;
    },
    resetUser: (state)=>{
      state.data = null;
    }
  },
 extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, () => {})
      .addCase(fetchUser.fulfilled, (state, action) => {       
        state.data = action.payload;        
      })
      .addCase(fetchUser.rejected, (state) => {
        state.data = null;
      })
      ;
  }

});

export const { setUser, resetUser } = userSlice.actions;
export type { IUser, IUserData } from './interfaces';
export default userSlice.reducer;