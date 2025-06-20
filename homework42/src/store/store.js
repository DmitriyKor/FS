import { configureStore } from '@reduxjs/toolkit';

import {settingsSliceReducer} from './settingsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsSliceReducer,
  },
})