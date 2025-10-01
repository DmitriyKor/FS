export interface IHistoryItem {
    _id: string;
    categoryId : string | undefined | null;
    categoryName : string | undefined | null;
    userId : string | undefined | null;
    comment : string | undefined | null;
    income: number;
    expense: number;
}

export interface IHistoryId {
    _id: string;
}
export interface IHistory {
    items: IHistoryItem[];
    countTotal: number;
    isLoading: boolean;
    error: string | undefined | null;
}

export const OPERATION_TYPE = {
    income: "income",
    expense: "expense"
}
