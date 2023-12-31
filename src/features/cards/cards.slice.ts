import { createSlice } from "@reduxjs/toolkit";
import { packsInitialState } from "features/packs/packs.slice";
import { createAppAsyncThunk, thunkTryCatch } from "utils";
import { GetPacksPayload, packsApi } from "features/packs/packs.api";
import { AddCardType, cardsApi, CardsPayload, CardType, ResponseCardType } from "features/cards/cards.api";

export const cardsInitialState: ResponseCardType = {
  cards: [],
  cardsTotalCount: null as null | number,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
  packUserId: null as null | string,
};

const slice = createSlice({
  name: "cards",
  initialState: cardsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});

const getCards = createAppAsyncThunk<any, CardsPayload>("cards/getCards", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    let res = await cardsApi.getCards(arg);
    return res.data;
  });
});

const addCard = createAppAsyncThunk<any, AddCardType>("cards/addCard", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { dispatch, rejectWithValue } = thunkAPI;
    await cardsApi.addCard(arg);
    dispatch(
      getCards({
        cardsPack_id: arg.cardsPack_id,
        pageCount: 10,
      })
    );
  });
});

const updateCard = createAppAsyncThunk<any, CardType>("cards/updateCard", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { dispatch, rejectWithValue } = thunkAPI;
    await cardsApi.updateCard(arg);
    dispatch(
      getCards({
        cardsPack_id: arg.cardsPack_id,
        pageCount: 10,
      })
    );
  });
});

const deleteCard = createAppAsyncThunk<any, { userID: string; cardsPack_id: string }>(
  "cards/deleteCard",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue } = thunkAPI;
      await cardsApi.deleteCard(arg.userID);
      dispatch(
        getCards({
          cardsPack_id: arg.cardsPack_id,
          pageCount: 10,
        })
      );
    });
  }
);

const putGradeCard = createAppAsyncThunk<any, { grade: number; card_id: string }>(
  "cards/putGradeCard",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue } = thunkAPI;
      await cardsApi.putGradeCard(arg);

      let cardsPackId = sessionStorage.getItem("cardsPATH");
      if (cardsPackId) {
        dispatch(
          getCards({
            cardsPack_id: cardsPackId.split("/")[3],
            pageCount: 50,
          })
        );
      }
    });
  }
);

export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { getCards, addCard, deleteCard, updateCard, putGradeCard };
