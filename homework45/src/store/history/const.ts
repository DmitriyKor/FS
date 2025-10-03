import type { IHistory } from "./types";

export const HISTORY_URI = '/history';

export const HISTORY_FILTER_ALL = 'all';
export const HISTORY_FILTER_INCOME = 'income';
export const HISTORY_FILTER_EXPENSE = 'expense';

export const initialState: IHistory = {
  items: [],
  isLoading: false,
  countTotal: 0,
  error: "",
  filter: HISTORY_FILTER_ALL,
} satisfies IHistory as IHistory;


