import { instance } from "common/api/common.api";

export const cardsApi = {
  getCards: (payload: CardsPayload) => {
    // console.log({ ...payload });
    return instance.get<ResponseCardType>("cards/card", { params: { ...payload } });
  },

  // addPack: (payload: { cardsPack: AddPack }) => {
  //     return instance.post("cards/pack", payload);
  // },

  // deletePack: (packId: string) => {
  //   console.log(packId);
  //   return instance.delete(`cards/pack?id=${packId}`);
  // },
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
  cardQuestion?: string;
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
  cardsPack_id?: string;
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
