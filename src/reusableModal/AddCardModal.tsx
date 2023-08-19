import React from "react";
import { BasicModal, BasicSelect } from "reusableModal";
import { ButtonComponent, ButtonComponentForm } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "app/hooks";
import { TextInputFormForModal } from "reusableComponents";
import { cardsThunks } from "features/cards/cards.slice";
import { InputTypeFileModal } from "reusableComponents/InputTypeFileModal";

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  paramsID: string;
  title: string;
};

export type Inputs = {
  question: string;
  answer: string;
  deckCover: string;
};

export const AddCardModal: React.FC<PropsType> = (props) => {
  const { open, setOpen, title, paramsID } = props;
  const [select, setSelect] = React.useState("Text"); //FOR SELECTOR

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const payload = {
      question: data.question,
      answer: data.answer,
      cardsPack_id: paramsID,
      questionImg: data.deckCover,
    };
    dispatch(cardsThunks.addCard({ ...payload }));
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
          <SelectWrapper>
            <BasicSelect select={select} setSelect={setSelect} />
          </SelectWrapper>
          {select !== "Text" && <InputTypeFileModal name="deckCover" control={control} modalKey={"add"} />}
          <InputWrapper>
            <TextInputFormForModal
              name="question"
              label="Question"
              rules={{ required: "Question is required" }}
              control={control}
              errors={errors.question}
              defaultValue={"How des it work in React?"}
            />
          </InputWrapper>
          <InputWrapper>
            <TextInputFormForModal
              name="answer"
              label="Answer"
              rules={{ required: "Answer is required" }}
              control={control}
              errors={errors.answer}
              defaultValue={"It works..."}
            />
          </InputWrapper>
          <TipicalWrapper>
            <ButtonComponent variant={"outlined"} callback={setOpenHandler} buttonName={"cancel"} />
            <ButtonComponentForm variant={"contained"} control={control} buttonName={"save"} />
          </TipicalWrapper>
        </FormWrapper>
      </form>
    </BasicModal>
  );
};

const SelectWrapper = styled.div`
  margin-left: 8px;
  margin-top: 20px;
  width: 413px;
`;

const FormWrapper = styled.span`
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  margin-top: 20px;
`;

const TipicalWrapper = styled.div`
  display: flex;
  margin-top: 55px;
  justify-content: space-around;

  & > button {
    width: 26%;
  }
`;
