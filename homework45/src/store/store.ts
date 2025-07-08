import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './user';
import historySliceReducer from './history';
import categoriesSliceReducer from './category';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    history: historySliceReducer,
    categories: categoriesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;