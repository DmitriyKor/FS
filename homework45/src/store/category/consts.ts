import { v4 as uuidv4 } from 'uuid';

import type {ICategories} from './interfaces.ts';

export const DEFAULT_CATEGORIES: ICategories = {
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
    ],
}