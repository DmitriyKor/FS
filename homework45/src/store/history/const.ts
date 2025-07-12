export const HISTORY_URI = '/history';

export const initialState: IHistory = {
  items: [],
  isLoading: false,
  error: "",
} satisfies IHistory as IHistory;