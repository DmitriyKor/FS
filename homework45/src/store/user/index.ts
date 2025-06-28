import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import type {IUserPassword, IUser} from './interfaces.ts';

const initialState: IUser = {
  name: "",
  email: "",
  image: "",
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
      state.image = action.payload.image;
      state.startBalance = action.payload.startBalance;
    },
    setPassword: (state, action: PayloadAction<IUserPassword>) => {
      if (state.password===action.payload.oldPassword) {state.password = action.payload.password}
    },
  }
});

export const { setUser, setPassword } = userSlice.actions;
//export { IUser, IUserPassword } from './interfaces';;
export default userSlice.reducer;