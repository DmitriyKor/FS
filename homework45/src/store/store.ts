import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './user';
import historySliceReducer from './history';
import categoriesSliceReducer from './category';
import drawerSliceReducer from './drawer';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    history: historySliceReducer,
    categories: categoriesSliceReducer,
    drawer : drawerSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;