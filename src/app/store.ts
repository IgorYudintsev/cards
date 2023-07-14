import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/auth.slice";
import { appReducer } from "app/app.slice";
import { packsReducer } from "features/packs/packs.slice";
import { cardsReducer } from "features/cards/cards.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
