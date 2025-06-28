import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './user';
import historySliceReducer from './history';
import categorySliceReducer from './category';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    history: historySliceReducer,
    category: categorySliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;