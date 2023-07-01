import React, { ReactNode, useState } from "react";
import { ArgLoginType } from "features/auth/auth.api";
import { Paper } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { S } from "./Form_styles";
import { TextInputForm } from "reusableComponents/TextInputForm";
import { PasswordTextInputForm } from "reusableComponents/PasswordTextInputForm";
import { Link } from "react-router-dom";
import { CheckBox } from "reusableComponents/CheckBox";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { ButtonComponentForm } from "reusableComponents/ButtonComponentForm";

type LoginFormProps = {
  title: string;
  callBack: (payload: ArgLoginType) => void;
  forRegister: boolean;
  //children?: ReactNode;
};

export type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { title, callBack, forRegister } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      email: data.email, //dollarselephant@gmail.com
      password: data.password, //12345678
      rememberMe: data.rememberMe,
    };

    callBack(payload);
  };

  return (
    <S.Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormWrapper>
            <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>

            <TextInputForm
              name="email"
              label="Email"
              rules={{ required: "Email is required" }}
              control={control}
              errors={errors.email}
            />

            <PasswordTextInputForm
              name={"password"}
              label={"Password"}
              rules={{ required: "Password is required" }}
              control={control}
              errors={errors.password}
            />

            <CheckBox name={"rememberMe"} control={control} />

            <S.WrapperForgetPassword>
              <Link to={"/forgot"}>Forgot password?</Link>
            </S.WrapperForgetPassword>

            <S.TipicalWrapper>
              <ButtonComponentForm variant={"contained"} control={control} buttonName={title} />
            </S.TipicalWrapper>

            <S.TipicalWrapper>
              <span>Don't have an account?</span>
            </S.TipicalWrapper>

            <S.DontHaveAccount>
              {title === "Sign up" ? <Link to={"/login"}>Sign in</Link> : <Link to={"/register"}>Sign up</Link>}
            </S.DontHaveAccount>
          </S.FormWrapper>
        </form>
      </Paper>
    </S.Wrapper>
  );
};
