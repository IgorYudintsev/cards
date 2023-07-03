import React from "react";
import { ForgotForm } from "reusableForms/ForgotForm";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { ForgetPasswordType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const emailSended = useAppSelector((state) => state.auth.emailSended);

  const queryForgot = (payload: ForgetPasswordType) => {
    dispatch(authThunks.forgetpassword(payload))
      .unwrap() //благодаря unwrap() -мы отрабатываем положительные или отрицательные кейсы
      .then((res) => {
        navigate("/check-email");
        console.log("Письмо для восстановления пароля успешно отправлено");
        // toast.success("Письмо для восстановления пароля успешно отправлено");
      })
      .catch((err) => {
        console.log("Похоже такого почтового ящика не существует");
        // toast.error("Похоже такого почтового ящика не существует");
      });
  };

  // if (emailSended) {
  //   navigate("/check-email");
  // }
  return <ForgotForm title={"Forgot your password?"} callBack={queryForgot} />;
};
