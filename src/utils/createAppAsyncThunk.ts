import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store";
import { AxiosError } from "axios";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
}>();
