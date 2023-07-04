import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { S } from "./Form_styles";
import { ButtonComponentForm } from "reusableComponents/ButtonComponentForm";
import { PasswordTextInputForm } from "reusableComponents/PasswordTextInputForm";

type PropsType = {
  title: string;
  callBack: (password: string) => void;
  forgot: boolean;
};

export type Inputs = {
  password: string;
};

export const SetnewPassForm: React.FC<PropsType> = (props) => {
  const { title, callBack, forgot } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    callBack(data.password);
  };

  return (
    <S.Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormWrapper>
            <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>

            <PasswordTextInputForm
              name={"password"}
              label={"Password"}
              rules={{ required: "Password is required" }}
              control={control}
              errors={errors.password}
              onePasField={true}
            />
            <S.OpacitySpan>Create new password and we will send you further instructions to email</S.OpacitySpan>

            <S.TipicalWrapper>
              <ButtonComponentForm variant={"contained"} control={control} buttonName={"Create new password"} />
            </S.TipicalWrapper>
          </S.FormWrapper>
        </form>
      </Paper>
    </S.Wrapper>
  );
};
