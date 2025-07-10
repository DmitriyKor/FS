import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayPosts: true,
  displayPhotos: true
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDisplayPosts: (state, action) => {
      state.displayPosts = action.payload;
    },
    setDisplayPhotos: (state, action) => {
      state.displayPhotos = action.payload;
    },
  },
})

export const { setDisplayPosts, setDisplayPhotos } = settingsSlice.actions;

export const settingsSliceReducer = settingsSlice.reducer;