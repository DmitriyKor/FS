import type { IHistory, IHistoryParams } from "./types";

export const HISTORY_ENDPOINT = '/history';

export const HISTORY_FILTER_ALL = 'all';
export const HISTORY_FILTER_INCOME = 'income';
export const HISTORY_FILTER_EXPENSE = 'expense';

export const HISTORY_DEFAULT_COUNT = 10;

export const HISTORY_DEFAULT_PARAMS: IHistoryParams = {from:0, count: HISTORY_DEFAULT_COUNT, filter: HISTORY_FILTER_ALL};

export const initialState: IHistory = {
  items: [],
  isLoading: false,
  countTotal: 0,
  error: "",
  params: HISTORY_DEFAULT_PARAMS,
} satisfies IHistory as IHistory;


