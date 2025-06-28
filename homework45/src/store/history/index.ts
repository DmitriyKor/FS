import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type {IHistoryItem, IHistoryId, IHistory} from './interfaces.ts';

const initialState: IHistory = {
    items: [],
} satisfies IHistory as IHistory;

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addOrSetHistoryItem: (state, action: PayloadAction<IHistoryItem>) => {            
            const idx: number = (action.payload.id === null)? 
                -1: state.items.findIndex((el) => el.id === action.payload.id);
            if (idx < 0) {
                state.items.push({...action.payload, id: uuidv4()});
            } else {
                const current_id = state.items[idx].id;
                state.items[idx] = { ...action.payload, id: current_id}
            }
        },
        deleteHistoryItem: (state, action: PayloadAction<IHistoryId>) => {
            const idx: number = state.items.findIndex((el) => el.id === action.payload.id);
            if (idx >=0) {
                state.items = state.items.filter((el) => el.id !== action.payload.id)
            }   
        },
        clearHistory: (state) => {
            state = initialState;  
        }
    },
})

export const { addOrSetHistoryItem, deleteHistoryItem, clearHistory } = historySlice.actions;
export default historySlice.reducer;
export * from './interfaces.ts'