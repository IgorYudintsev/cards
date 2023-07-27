import { RootState } from "app/store";

export const isLoadingSelector = (state: RootState) => state.app.isLoading;
export const errorSelector = (state: RootState) => state.app.error;
