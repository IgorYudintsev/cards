import React from "react";
import { BasicModal } from "reusableModal";
import { ButtonComponent, ButtonComponentForm } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";

type PropsType = {
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
  modalData: { id: string; name: string };
  title: string;
};

export type Inputs = {
  pack: string;
  rememberMe: boolean;
};

export const DeletePackModal: React.FC<PropsType> = (props) => {
  const { openDelete, setOpenDelete, modalData, title } = props;
  const { control, handleSubmit } = useForm<Inputs>();

  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(packsThunks.deletePack({ idForDelete: modalData.id, userID: userIDfromProfile }));
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
            Do you really want to remove <b>{modalData.name}</b>? All cards will be deleted.
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
