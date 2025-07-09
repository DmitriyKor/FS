import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios, { type AxiosResponse } from 'axios';

import type {ICategoryItem, ICategoryId, ICategories} from './interfaces.ts';
import { API_URL } from '../const.ts';
import type { IHistory } from '../history/types.ts';
import { useSelector } from 'react-redux';
//import {DEFAULT_CATEGORIES} from './consts.ts';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await axios(API_URL+'/category');
    return response.data;
  }
)

const initialState : ICategories = {
    items: null,
    isLoading : false,
    error: ""
}

const categoriesSlice = createSlice({
    name: 'category',
    initialState, 
    reducers: {
        updateCategoriesBalance: (state, action) => {      
            console.log('updateBalance: state, payload_________________');
            console.log(state.items);
            console.log(action.payload);
            state.items?.map((item_c)=>{
                item_c.balanceExpense=action.payload.items.reduce(
                    (accum, item)=> {item.categoryId==item_c.id? accum + item.expense: 0}, 
                0)
            })
        },
        addOrSetCategory: (state, action: PayloadAction<ICategoryItem>) => {
            const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
            if (idx < 0) {
                state.items?.push({ ...action.payload, id: uuidv4(), default: false });
            } else {
                if (!state.items[idx]?.default) {
                    const current_id = state.items[idx]?.id;
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
            //state = DEFAULT_CATEGORIES;   
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => { state.isLoading = true })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
          });
      }
})

export const { updateCategoriesBalance, addOrSetCategory, deleteCategory, clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
export * from './interfaces.ts'