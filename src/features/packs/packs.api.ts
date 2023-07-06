import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (payload: GetPacksPayload) => {
    // console.log({ ...payload });
    return instance.get<GetPacks>("cards/pack", { params: { ...payload } });
  },

  addPack: (payload: { cardsPack: AddPack }) => {
    return instance.post("cards/pack", payload);
  },

  // deletePack: (packId: string) => {
  //   console.log(packId);
  //   return instance.delete(`cards/pack?id=${packId}`);
  // },
  deletePack: (packId: string) => {
    return instance.delete(`cards/pack`, { params: { id: packId } });
  },
  updatePack: (payload: UpdatePack) => {
    console.log(payload);
    return instance.put("cards/pack", payload);
  },
};

export type GetPacksPayload = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: any;
  page?: number;
  pageCount?: number;
  user_id?: string;
};

export type UpdatePack = {
  cardsPack: {
    _id: string;
    name: string;
  };
};

export type AddPack = {
  name: string;
  deckCover?: "url or base64"; // не обязателен
  private?: false; // если не отправить будет такой
};

export type GetPacks = {
  cardPacks: CardPacks[];
  cardPacksTotalCount: number | null;
  maxCardsCount: number | null;
  minCardsCount: number | null;
  page: number | null;
  pageCount: number | null;
  token: string | null;
  tokenDeathTime: number | null;
};

export type CardPacks = {
  cardsCount: number;
  created: string;
  deckCover: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};

// export type UpdateProfileResponceType = {
//     token: string;
//     tokenDeathTime: number;
//     updatedUser: ProfileType;
// };
//
// export type UpdateProfileType = {
//     name?: string;
//     avatar?: string;
// };
//
// export type SetNewPasType = {
//     password: string;
//     resetPasswordToken: string | undefined;
// };
//
// export type ForgetPasswordType = {
//     email: string;
//     from: string;
//     message: string;
// };
//
// export type RegisterResponseType = {
//     addedUser: Omit<ProfileType, "token" | "tokenDeathTime">; //все кроме 'token' | 'tokenDeathTime'
// };
//
// export type ProfileType = {
//     _id: string;
//     email: string;
//     rememberMe: boolean;
//     isAdmin: boolean;
//     name: string;
//     verified: boolean;
//     publicCardPacksCount: number;
//     created: string;
//     updated: string;
//     __v: number;
//     token: string;
//     tokenDeathTime: number;
// };
//
// export type ArgLoginType = {
//     email: string;
//     password: string;
//     rememberMe: boolean;
// };
//
// export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">; //все кроме "rememberMe"
