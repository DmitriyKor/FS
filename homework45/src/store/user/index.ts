import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, { type AxiosResponse } from 'axios';

import type { IUserPassword, IUserData, IUser } from './interfaces.ts';

const initialState: IUser = {
  data: null,
  isLoading: true,
  error: null
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await axios('http:/localhost:3001/users/1');
    return response.json();
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
      if (state.data?.password === action.payload.oldPassword) { state.data.password = action.payload.password }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state)=>{state.isLoading=true})
      .addCase(fetchUser.fulfilled, (state)=>{state.isLoading=false})
      .addCase(fetchUser.rejected, (state, action)=>{
        state.isLoading=false; 
        state.error=action.error.message
      });
  }
});

export const { setUser, setPassword } = userSlice.actions;
//export { IUser, IUserPassword } from './interfaces';;
export default userSlice.reducer;