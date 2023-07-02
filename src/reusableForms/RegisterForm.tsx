import React, { ReactNode, useState } from "react";
import { ButtonComponentForm } from "reusableComponents/ButtonComponentForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { Paper } from "@mui/material";
import { ArgLoginType, ArgRegisterType } from "features/auth/auth.api";
import { S } from "./Form_styles";
import { TextInputForm } from "reusableComponents/TextInputForm";
import { PasswordTextInputForm } from "reusableComponents/PasswordTextInputForm";
import { Link } from "react-router-dom";

type PropsType = {
  title: string;
  callBack: (payload: ArgRegisterType) => void;
};

export type Inputs = {
  email: string;
  password: string;
  password2: string;
};

export const RegisterForm: React.FC<PropsType> = (props) => {
  const { title, callBack } = props;
  const [passwordsRequire, setPasswordsRequire] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const payload = {
      email: data.email, //dollarselephant@gmail.com
      password: data.password, //12345678
    };
    if (data.password === data.password2) {
      setPasswordsRequire(true);
      callBack(payload);
    } else {
      setPasswordsRequire(false);
    }
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
              passwordsRequire={passwordsRequire}
            />

            <PasswordTextInputForm
              name={"password2"}
              label={"Password"}
              rules={{ required: "Password is required" }}
              control={control}
              errors={errors.password2}
              passwordsRequire={passwordsRequire}
            />

            <S.TipicalWrapper>
              <ButtonComponentForm variant={"contained"} control={control} buttonName={title} />
            </S.TipicalWrapper>

            <S.TipicalWrapper>
              <span>Don't have an account?</span>
            </S.TipicalWrapper>

            <S.DontHaveAccount>
              {title === "Sign up" ? <Link to={"/sign-in"}>Sign in</Link> : <Link to={"/sign-up"}>Sign up</Link>}
            </S.DontHaveAccount>
          </S.FormWrapper>
        </form>
      </Paper>
    </S.Wrapper>
  );
};
