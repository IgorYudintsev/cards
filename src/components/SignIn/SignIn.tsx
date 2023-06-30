import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const SignIn = () => {
  // const logined = useAppSelector((state) => state.auth.profile);
  // const authMe = useAppSelector((state) => state.auth.profile);
  // console.log(authMe);

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   console.log("uihuihnujh");
  //   dispatch(authThunks.authMe());
  // }, []);

  return <h1>SignIn</h1>;
};
