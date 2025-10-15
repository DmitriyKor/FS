export interface ICategoryItem {
    _id: string;
    default: boolean;
    name: string;
    description: string;
    incomeAmount: number;
    expenseAmount: number;
}

export interface ICategoryId {
    _id: String;
}

export interface ICategories {
    items: ICategoryItem[] | null | undefined;
    isLoading : boolean;
    error: string | null | undefined;
}