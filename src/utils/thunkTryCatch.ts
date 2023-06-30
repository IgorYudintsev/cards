import { AppDispatch, RootState } from "app/store";
//import { appActions } from "app/app.slice";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError, isAxiosError } from "axios";

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null>, logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  //debugger;
  // переехал в addMatcher
  // dispatch(appActions.setIsLoading({ isLoading: true }));
  try {
    return await logic();
  } catch (e: any) {
    // перенесли в addmatch
    // const err = e as Error | AxiosError<{ error: string }>;
    // //    Error-нативная ошибка, к примеру нет свойства у...
    // if (isAxiosError(err)) {
    //   const error = err.response ? err.response.data.error : err.message;
    //   dispatch(appActions.setError({ error }));
    // } else {
    //   dispatch(appActions.setError({ error: `Native error ${err.message}` }));
    // }
    return rejectWithValue(e);
  } finally {
    // переехал в addMatcher
    // dispatch(appActions.setIsLoading({ isLoading: false }));
  }
};

//---------------------------------------------------------------------------------------------------------------------
// export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null>, logic: Function) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     return await logic();
//   } catch (e: any) {
//     const error = e.response ? e.response.data.error : e.message;
//     dispatch(appActions.setError({ error }));
//     return rejectWithValue(null);
//   }
// };
