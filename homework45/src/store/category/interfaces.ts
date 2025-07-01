export interface ICategoryItem {
    id: string;
    default: boolean;
    name: string;
    description: string;
    balanceIncome: number;
    balanceExpend: number;
}

export interface ICategoryId {
    id: String;
}

export interface ICategories {
    items: ICategoryItem[] | null;
    isLoading : boolean;
    error: string | null | undefined;
}