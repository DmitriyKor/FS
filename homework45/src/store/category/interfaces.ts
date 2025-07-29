export interface ICategoryItem {
    id: string;
    default: boolean;
    name: string;
    description: string;
    balanceIncome: number;
    balanceExpense: number;
}

export interface ICategoryId {
    id: String;
}

export interface ICategories {
    items: ICategoryItem[] | null | undefined;
    isLoading : boolean;
    error: string | null | undefined;
}