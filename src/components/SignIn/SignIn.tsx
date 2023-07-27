import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { FormComponent } from "reusableForms/FormComponent";
import { LoginForm } from "reusableForms/LoginForm";
import { useNavigate } from "react-router-dom";
import { ArgLoginType } from "features/auth/auth.api";
import { toast } from "react-toastify";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const queryLogin = (payload: ArgLoginType) => {
    dispatch(authThunks.login(payload))
      .unwrap() //благодаря unwrap() -мы отрабатываем положительные или отрицательные кейсы
      .then((res) => {
        toast.success("Вы успешно залогинились");
        navigate("/packs");
      })
      .catch((err) => {
        //toast.error("Залогиниться не удалось");
      });
  };
  return (
    <>
      <FormComponent>
        <LoginForm title={"Sign in"} callBack={queryLogin} />
      </FormComponent>
    </>
  );
};
