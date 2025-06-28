export interface IHistoryItem {
    id: String;
    categoryId : String;
    comment : String;
    income: Number;
    expend: Number;
}

export interface IHistoryId {
    id: String;
}

export interface IHistory {
    items: IHistoryItem[];
}
