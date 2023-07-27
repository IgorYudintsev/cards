import { RootState } from "app/store";

export const cardsSelector = (state: RootState) => state.cards.cards;
