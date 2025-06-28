export interface ICategoryItem {
    id: String;
    default: Boolean;
    name: String;
    description: String;
    balanceIncome: Number;
    balanceExpend: Number;
}

export interface ICategoryId {
    id: String;
}

export interface ICategories {
    items: ICategoryItem[];
}