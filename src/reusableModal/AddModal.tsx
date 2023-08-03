import React, { useState } from "react";
import { BasicModal } from "reusableModal";
import { ButtonComponent, ButtonComponentForm, CheckBox } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { PayloadTypeForUpdate } from "components/Packs/Packs";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";
import { TextInputFormForModal } from "reusableComponents/TextInputFormForModal";

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  title: string;
};

export type Inputs = {
  pack: string;
  rememberMe: boolean;
};

export const AddModal: React.FC<PropsType> = (props) => {
  const { open, setOpen, name, title } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload: PayloadTypeForUpdate = {
      cardsPack: {
        name: data.pack,
        private: data.rememberMe,
      },
    };
    dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
    setOpen(false);
  };

  const setOpenHandler = () => {
    setOpen(false);
  };

  return (
    <BasicModal open={open} setOpen={setOpen} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <InputWrapper>
            <TextInputFormForModal
              name="pack"
              label="Pack"
              rules={{ required: "Pack is required" }}
              control={control}
              errors={errors.pack}
              defaultValue={name}
            />
          </InputWrapper>

          <CheckBox name={"rememberMe"} control={control} title={"Private pack"} />

          <TipicalWrapper>
            <ButtonComponent variant={"outlined"} callback={setOpenHandler} buttonName={"cancel"} />
            <ButtonComponentForm variant={"contained"} control={control} buttonName={"save"} />
          </TipicalWrapper>
        </FormWrapper>
      </form>
    </BasicModal>
  );
};

const FormWrapper = styled.span`
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  margin-top: 30px;
`;

const TipicalWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-around;

  & > button {
    width: 26%;
  }
`;
