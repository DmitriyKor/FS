import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type {ICategoryItem, ICategoryId, ICategories} from './interfaces.ts';
import {DEFAULT_CATEGORIES} from './consts.ts';

const categorySlice = createSlice({
    name: 'category',
    initialState: DEFAULT_CATEGORIES,
    reducers: {
        addOrSetCategory: (state, action: PayloadAction<ICategoryItem>) => {
            const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
            if (idx < 0) {
                state.items.push({ ...action.payload, id: uuidv4(), default: false });
            } else {
                if (!state.items[idx].default) {
                    const current_id = state.items[idx].id;
                    state.items[idx] = { ...action.payload, id: current_id, default: false }
                }
            }
        },
        deleteCategory: (state, action: PayloadAction<ICategoryId>) => {
            const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
            if (idx >=0 && !state.items[idx].default) {
                state.items = state.items.filter((el) => el.id !== action.payload.id)
            }   
        },
        clearCategories: (state) => {
            state = DEFAULT_CATEGORIES;   
        }
    },
})

export const { addOrSetCategory, deleteCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
export * from './interfaces.ts'