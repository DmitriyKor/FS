import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface ICategoryItem {
    id: String,
    default: Boolean,
    name: String,
    description: String,
    balanceIncome: Number,
    balanceExpend: Number,
}

interface ICategoryId {
    id: String
}

interface ICategories {
    items: ICategoryItem[];
}

const DEFAULT_CATEGORIES: ICategories = {
    items: [
        {
            id: uuidv4(),
            default: true,
            name: "Food",
            description: "",
            balanceIncome: 0,
            balanceExpend: 0
        },
        {
            id: uuidv4(),
            default: true,
            name: "Home cleaning products",
            description: "",
            balanceIncome: 0,
            balanceExpend: 0
        },
        {
            id: uuidv4(),
            default: true,
            name: "Clothes",
            description: "",
            balanceIncome: 0,
            balanceExpend: 0
        },
    ];
}

const categorySlice = createSlice({
    name: 'category',
    initialState: DEFAULT_CATEGORIES,
    reducers: {
        addOrSetCategory: (state, action: PayloadAction<ICategoryItem>) => {
            const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
            if (idx < 0) {
                state.items.push({ ...action.payload, default: false });
            } else {
                if (!state.items[idx].default) {
                    state.items[idx] = { ...action.payload, default: false }
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
export type { ICategoryItem, ICategoryId, ICategories };
export default categorySlice.reducer;