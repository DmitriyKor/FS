export interface IHistoryItem {
    id: string;
    categoryId : string;
    userId : string;
    comment : string;
    income: number;
    expense: number;
}

export interface IHistoryId {
    id: string;
}
export interface IHistory {
    items: IHistoryItem[];
    isLoading: boolean;
    error: string | undefined;
}

export const OPERATION_TYPE = {
    income: "income",
    expense: "expense"
}
