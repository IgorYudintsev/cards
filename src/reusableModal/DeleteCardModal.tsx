import React from "react";
import { BasicModal } from "reusableModal";
import { ButtonComponent, ButtonComponentForm } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { CardType } from "features/cards/cards.api";

type PropsType = {
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
  modalDataDELETE: CardType;
  title: string;
};

export type Inputs = {
  pack: string;
  rememberMe: boolean;
};

export const DeleteCardModal: React.FC<PropsType> = (props) => {
  const { openDelete, setOpenDelete, modalDataDELETE, title } = props;
  const { control, handleSubmit } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (modalDataDELETE.user_id) {
      dispatch(cardsThunks.deleteCard({ userID: modalDataDELETE.user_id, cardsPack_id: modalDataDELETE.cardsPack_id }));
    }

    setOpenDelete(false);
  };

  const setOpenHandler = () => {
    setOpenDelete(false);
  };

  return (
    <BasicModal open={openDelete} setOpen={setOpenDelete} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <div>
            Do you really want to remove <b>{modalDataDELETE.question}</b>? Card will be deleted.
          </div>
          <TipicalWrapper>
            <ButtonComponent variant={"outlined"} callback={setOpenHandler} buttonName={"cancel"} />
            <ButtonComponentForm variant={"contained"} control={control} buttonName={"DELETE"} color={"red"} />
          </TipicalWrapper>
        </FormWrapper>
      </form>
    </BasicModal>
  );
};

const FormWrapper = styled.span`
  margin-right: 10px;
`;

const TipicalWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-around;

  & > button {
    width: 26%;
  }
`;
