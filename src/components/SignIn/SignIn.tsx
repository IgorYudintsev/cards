import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { FormComponent } from "reusableForms/FormComponent";
import { LoginForm } from "reusableForms/LoginForm";
import { useNavigate } from "react-router-dom";
import { ArgLoginType } from "features/auth/auth.api";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);

  logined ? navigate("/packs") : dispatch(authThunks.authMe());

  const queryLogin = (payload: ArgLoginType) => {
    console.log(payload);
    dispatch(authThunks.login(payload));
    //к каждой санке можно прикрутить then
    // dispatch(authThunks.login(payload))
    //     .unwrap() //благодаря unwrap() -мы отрабатываем положительные или отрицательные кейсы
    //     .then((res) => {
    //         toast.success("Вы успешно залогинились");
    //     })
    //     .catch((err) => {
    //         // toast.error("Залогиниться не удалось");
    //     });
  };
  return (
    <>
      <FormComponent>
        <LoginForm title={"Sign in"} callBack={queryLogin} forRegister={false} />
      </FormComponent>
    </>
  );
};
