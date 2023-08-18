import React from "react";
import { BasicModal } from "reusableModal";
import { ButtonComponent, ButtonComponentForm, CheckBox } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";
import { TextInputFormForModal } from "reusableComponents/TextInputFormForModal";
import { CardPacks, GetPacksPayload } from "features/packs/packs.api";
import { InputTypeFileModal } from "reusableComponents/InputTypeFileModal";

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  modalData?: { id: string; name: string };
  setModalData?: (data: { id: string; name: string }) => void;
  deckCover: string;
  title: string;
  pack: GetPacksPayload;
};

export type Inputs = {
  pack: string;
  rememberMe: boolean;
  deckCover: string;
};

export const UpdatePackModal: React.FC<PropsType> = (props) => {
  const { open, setOpen, name, modalData, title, pack, deckCover } = props;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      cardsPack: {
        _id: modalData!.id,
        name: data.pack,
        deckCover: data.deckCover,
        private: data.rememberMe,
      },
    };
    dispatch(packsThunks.updatePack({ pack, payload, userID: userIDfromProfile }));
    setOpen(false);
    reset();
  };

  const setOpenHandler = () => {
    setOpen(false);
  };

  return (
    <BasicModal open={open} setOpen={setOpen} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <InputWrapper>
            <InputTypeFileModal name="deckCover" control={control} modalKey={"update"} deckCover={deckCover} />
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
