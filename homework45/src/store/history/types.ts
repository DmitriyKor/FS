export interface IHistoryItem {
    id: String;
    categoryId : String;
    userId : String;
    comment : String;
    income: Number;
    expense: Number;
}

export interface IHistoryId {
    id: String;
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
