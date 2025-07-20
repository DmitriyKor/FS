import { createSlice } from "@reduxjs/toolkit";

export enum DrawerState {extended, narrow, hidden};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState: DrawerState.extended,
    reducers: {
        displayDrawer: (state: DrawerState, action) => {
            console.log('New drawer state:')
            console.log(action);
            state = action.payload;
            return state;
        }
    },
})

export const { displayDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
