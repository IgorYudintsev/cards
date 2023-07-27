import { RootState } from "app/store";

export const loginedSelector = (state: RootState) => state.auth.profile;
export const userIDfromProfileSelector = (state: RootState) => state.auth.profile!._id;
export const emailSelector = (state: RootState) => state.auth.email;
