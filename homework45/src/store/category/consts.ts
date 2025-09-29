import type {ICategories} from './interfaces.ts';

export const initialState: ICategories = {
    items: null,
    isLoading: false,
    error: ""
}

export const ENDPOINT_CATEGORIES = '/categories';