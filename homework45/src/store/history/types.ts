export interface IHistoryItem {
    id: string;
    categoryId : string | undefined | null;
    userId : string | undefined | null;
    comment : string | undefined | null;
    income: number;
    expense: number;
}

export interface IHistoryId {
    id: string;
}
export interface IHistory {
    items: IHistoryItem[];
    isLoading: boolean;
    error: string | undefined | null;
}

export const OPERATION_TYPE = {
    income: "income",
    expense: "expense"
}
