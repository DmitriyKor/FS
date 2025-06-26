import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface IUser {
  name: String,
  email: String,
  password: String,
  startBalance: Number,
}

interface IUserPassword {
  oldPassword : String;
  password : String;
}

const initialState: IUser = {
  name: "",
  email: "",
  password: "",
  startBalance: 0
} satisfies IUser as IUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.startBalance = action.payload.startBalance;
    },
    setPassword: (state, action: PayloadAction<IUserPassword>) => {
      if (state.password===action.payload.oldPassword) {state.password = action.payload.password}
    },
  }
});

export const { setUser } = userSlice.actions;
export type { IUser, IUserPassword };
export default userSlice.reducer;