import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { ForgetPasswordType } from "features/auth/auth.api";
import { S } from "./Form_styles";
import { TextInputForm } from "reusableComponents/TextInputForm";
import { ButtonComponentForm } from "reusableComponents/ButtonComponentForm";

type PropsType = {
  title: string;
  callBack: (payload: ForgetPasswordType) => void;
};

export type Inputs = {
  email: string;
};

export const ForgotForm: React.FC<PropsType> = (props) => {
  const { title, callBack } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      email: data.email, // кому восстанавливать пароль
      from: "test-front-admin <nickkolaevn@mail.ru>",
      // можно указать разработчика фронта)
      message: `<div style="background-color: lime; padding: 15px">
    password recovery link:
    <a href='http://localhost:3000/set-new-password/$token$'>
    link</a>
    </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    };
    callBack(payload);
  };
  console.log(errors);
  return (
    <S.Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormWrapper>
            <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>

            <TextInputForm
              name="email"
              label="Email"
              rules={{ required: "Email is required", pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i }}
              control={control}
              errors={errors.email}
              defaultValue={"developeryudintsev@gmail.com"}
            />
            {/*{errors.email && <p>Введите корректный email адрес.</p>}*/}
            <S.OpacitySpan>Enter your email address and we will send you further instructions </S.OpacitySpan>

            <S.TipicalWrapper>
              <ButtonComponentForm variant={"contained"} control={control} buttonName={"Send Instructions"} />
            </S.TipicalWrapper>

            <S.TipicalWrapper>
              <span>Did you remember your password?</span>
            </S.TipicalWrapper>

            <S.DontHaveAccount>
              <Link to={"/sign-in"}>Try logging in</Link>
            </S.DontHaveAccount>
          </S.FormWrapper>
        </form>
      </Paper>
    </S.Wrapper>
  );
};
