import React from "react";
import { RegisterForm } from "reusableForms/RegisterForm";
import { FormComponent } from "reusableForms/FormComponent";
import { ArgRegisterType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const queryLogin = (payload: ArgRegisterType) => {
    dispatch(authThunks.register(payload))
      .unwrap() //благодаря unwrap() -мы отрабатываем положительные или отрицательные кейсы
      .then((res) => {
        navigate("/sign-in");
        toast.success("Вы успешно залогинились");
      })
      .catch((err) => {
        console.log("Такой Юзверь уже есть");
        toast.error("Залогиниться не удалось");
      });
  };

  return (
    <FormComponent>
      <RegisterForm title={"Sign up"} callBack={queryLogin} />
    </FormComponent>
  );
};
