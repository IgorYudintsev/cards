import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

const appInitialState = {
  error: null as string | null,
  isLoading: false,
  isAppInitialized: false,
};

type appInitialStateType = typeof appInitialState;

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    // setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
    //   //debugger;
    //   state.isLoading = action.payload.isLoading;
    // },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          //if(action.type==='auth/login/pending')return  false    //для примера как обыграть исключение
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          console.log(action.type);
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          // console.log(action.type);
          if (action.type == "auth/me/rejected") {
            state.error = null;
          }
          if (action.type != "auth/me/rejected") {
            const err = action.payload as Error | AxiosError<{ error: string }>;
            if (isAxiosError(err)) {
              state.error = err.response ? err.response.data.error : err.message;
            } else {
              state.error = `Native error ${err.message}`;
            }
          }
          state.isLoading = false;
        }
      );
    // (action) => action.type.endsWith("/rejected"),
    // (state, action) => {
    //   const err = action.payload as Error | AxiosError<{ error: string }>;
    //   //    Error-нативная ошибка, к примеру нет свойства у...
    //   if (isAxiosError(err)) {
    //     state.error = err.response ? err.response.data.error : err.message;
    //     //dispatch(appActions.setError({ error }));
    //   } else {
    //     state.error = `Native error ${err.message}`;
    //   }
    //   state.isLoading = false;
    // }
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
