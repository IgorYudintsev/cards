import { instance } from "common/api/common.api";

export const authApi = {
  register: (payload: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", payload);
  },

  authMe: () => {
    console.log("authMe");
    return instance.post("auth/me", {}).then((res) => res.data);
  },

  login: (payload: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", payload).then((res) => res.data);
  },
  logout: () => {
    return instance.delete("auth/me");
  },
  forget: (payload: ForgetPasswordType) => {
    return instance.post("https://neko-back.herokuapp.com/2.0/auth/forgot", payload, { withCredentials: true });
  },
  setNewPas: (payload: SetNewPasType) => {
    return instance.post("https://neko-back.herokuapp.com/2.0/auth/set-new-password", payload, {
      withCredentials: true,
    });
  },
  updateProfile: (payload: UpdateProfileType) => {
    return instance.put<UpdateProfileResponceType>("auth/me", payload).then((res) => res.data.updatedUser);
  },
};

export type UpdateProfileResponceType = {
  token: string;
  tokenDeathTime: number;
  updatedUser: ProfileType;
};

export type UpdateProfileType = {
  name?: string;
  avatar?: string;
};

export type SetNewPasType = {
  password: string;
  resetPasswordToken: string | undefined;
};

export type ForgetPasswordType = {
  email: string;
  from: string;
  message: string;
};

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">; //все кроме 'token' | 'tokenDeathTime'
};

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">; //все кроме "rememberMe"
