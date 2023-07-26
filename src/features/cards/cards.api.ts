import { instance } from "common/api/common.api";

export const cardsApi = {
  getCards: (payload: CardsPayload) => {
    return instance.get<ResponseCardType>("cards/card", { params: { ...payload } });
  },

  addCard: (payload: AddCardType) => {
    return instance.post("cards/card", { card: { ...payload } });
  },

  updateCard: (payload: CardType) => {
    return instance.put("cards/card", { card: { ...payload } });
  },

  deleteCard: (cardId: string) => {
    console.log(cardId);
    return instance.delete(`cards/card?id=${cardId}`);
  },

  // deletePack: (packId: string) => {
  //     return instance.delete(`cards/pack`, { params: { id: packId } });
  // },
  // updatePack: (payload: UpdatePack) => {
  //     console.log(payload);
  //     return instance.put("cards/pack", payload);
  // },
};

export type CardsPayload = {
  cardAnswer?: string;
  cardQuestion?: string | null;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: any;
  page?: number;
  pageCount?: number;
};

export type ResponseCardType = {
  cards: Array<CardType>;
  cardsTotalCount: number | null;
  maxGrade: number | null;
  minGrade: number | null;
  page: number | null;
  pageCount: number | null;
  packUserId: string | null;
};

export type CardType = {
  answer?: string;
  question?: string;
  cardsPack_id: string;
  grade?: number;
  rating?: number;
  shots?: number;
  type?: string;
  user_id?: string;
  created?: string;
  updated?: string;
  __v?: 0;
  _id?: string;
};

export type AddCardType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};
