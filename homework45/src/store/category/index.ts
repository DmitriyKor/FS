import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type AxiosResponse } from 'axios';

import type { ICategoryItem, ICategoryId, ICategories } from './interfaces.ts';
import { API_URL } from '../const.ts';
import { ENDPOINT_CATEGORIES, initialState } from './consts.ts';
import { authAxios } from '../../helpers/authAxios.ts';
import type { IHistoryItem } from '../history/types.ts';

export const fetchCategories : any = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response : AxiosResponse = await authAxios.instance(API_URL + ENDPOINT_CATEGORIES);
        console.log('fetchCategories:');
        console.log(response);
        return response.data;
    }
)

export const addCategory : any = createAsyncThunk(
  'categories/addCategory',
  async (data: ICategoryItem) => {
    const response  : AxiosResponse = await authAxios.instance.post(API_URL+ENDPOINT_CATEGORIES, data);
    return response.data;
  }
)

export const deleteCategory : any = createAsyncThunk(
  'categories/deleteCategory',
  async (data: ICategoryId) => {
    const response = await authAxios.instance.delete(API_URL+ENDPOINT_CATEGORIES+'/'+data.id);
    return response.data;
  }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        updateCategoriesBalance: (state: ICategories, action) => {
            state.items = state.items?.map((item_category) => {
                return {
                    ...item_category,
                    balanceExpense: action.payload.reduce((acc:number, item : IHistoryItem) => {
                        return item_category.id == item.categoryId ? acc + Number(item.expense) : acc
                    }, 0),
                    balanceIncome: action.payload.reduce((acc:number, item : IHistoryItem) => {
                        return item_category.id == item.categoryId ? acc + Number(item.income) : acc
                    }, 0),
                }
            })
        },
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
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.items?.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const idx : number | undefined = state.items?.findIndex(item => item.id == action.meta.arg.id);
                if (idx && idx>-1) {
                    state.items?.splice(idx, 1);
                }
            })
            ;
    }
})

export const { updateCategoriesBalance } = categoriesSlice.actions;
export default categoriesSlice.reducer;
export * from './interfaces.ts'