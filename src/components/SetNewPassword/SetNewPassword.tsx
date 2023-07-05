import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import { SetNewPasType } from "features/auth/auth.api";
import { useAppDispatch } from "app/hooks";
import { FormComponent } from "reusableForms/FormComponent";
import { LoginForm } from "reusableForms/LoginForm";
import { SetnewPassForm } from "reusableForms/SetNewPasswordForm";

export const SetNewPassword = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const querySetNewPas = (password: string) => {
    const payload: SetNewPasType = {
      password,
      resetPasswordToken: param.token,
    };
    dispatch(authThunks.setNewPas(payload))
      .unwrap()
      .then((res) => {
        navigate("/sign-in");
      })
      .catch((err) => {});
  };

  return (
    <FormComponent>
      <SetnewPassForm title={"Create new password"} callBack={querySetNewPas} forgot={false} />
    </FormComponent>
  );
};
