import React from "react";
import { BasicModal } from "reusableModal";
import { ButtonComponent, ButtonComponentForm, CheckBox, TextInputForm } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { PayloadTypeForUpdate } from "components/Packs/Packs";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export type Inputs = {
  email: string;
  rememberMe: boolean;
};

export const AddModal: React.FC<PropsType> = ({ open, setOpen }) => {
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
        name: data.email,
        private: data.rememberMe,
      },
    };

    dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
    setOpen(false);
  };

  return (
    <BasicModal open={open} setOpen={setOpen} title={"Add new pack"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <InputWrapper>
            <TextInputForm
              name="email"
              label="Email"
              rules={{ required: "Email is required" }}
              control={control}
              errors={errors.email}
              defaultValue={"UPDATED PACK"}
            />
          </InputWrapper>

          <CheckBox name={"rememberMe"} control={control} title={"Private pack"} />

          <TipicalWrapper>
            <ButtonComponent variant={"outlined"} callback={() => setOpen(false)} buttonName={"cancel"} />
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
