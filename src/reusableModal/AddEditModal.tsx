import React from "react";
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
  modalData?: { id: string; name: string };
  setModalData?: (data: { id: string; name: string }) => void;
  modalKey: "updatePack" | "addPack";
  title: string;
};

export type Inputs = {
  email: string;
  rememberMe: boolean;
};

export const AddEditModal: React.FC<PropsType> = (props) => {
  const { open, setOpen, name, modalData, modalKey, title } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (modalKey === "addPack") {
      const payload: PayloadTypeForUpdate = {
        cardsPack: {
          name: data.email,
          private: data.rememberMe,
        },
      };
      dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
    } else {
      const payload = {
        cardsPack: {
          _id: modalData!.id,
          name: data.email,
          private: data.rememberMe,
        },
      };
      dispatch(packsThunks.updatePack({ payload, userID: userIDfromProfile }));
    }
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
              name="email"
              label="Email"
              rules={{ required: "Email is required" }}
              control={control}
              errors={errors.email}
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
