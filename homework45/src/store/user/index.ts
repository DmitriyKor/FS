import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, { type AxiosResponse } from 'axios';

import type { IUserPassword, IUserData, IUser } from './interfaces.ts';
import { API_URL } from '../const.ts';

const initialState: IUser = {
  data: null,
  password : "",
  isLoading: true,
  error: null
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await axios(API_URL+'/user/1');
    return response.data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.data = action.payload;
    },
    setPassword: (state, action: PayloadAction<IUserPassword>) => {
      if (state.password === action.payload.oldPassword) { state.password = action.payload.password }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.isLoading = true })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
      });
  }
});

export const { setUser, setPassword } = userSlice.actions;
export type { IUser, IUserData, IUserPassword } from './interfaces';
export default userSlice.reducer;