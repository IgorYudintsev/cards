import React from "react";
import { BasicModal, BasicSelect } from "reusableModal";
import { ButtonComponent, ButtonComponentForm } from "reusableComponents";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "app/hooks";
import { TextInputFormForModal } from "reusableComponents";
import { cardsThunks } from "features/cards/cards.slice";
import { CardType } from "features/cards/cards.api";
import { InputTypeFileModal } from "reusableComponents/InputTypeFileModal";

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  modalData: CardType;
  deckCover: string | undefined;
};

export type Inputs = {
  question: string;
  answer: string;
  deckCover: string;
};

export const UpdateCardModal: React.FC<PropsType> = (props) => {
  const { open, setOpen, title, modalData, deckCover } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // dispatch(cardsThunks.addCard({ question: data.question, answer: data.answer, cardsPack_id: paramsID }));
    dispatch(
      cardsThunks.updateCard({
        ...modalData,
        question: data.question,
        answer: data.answer,
        questionImg: data.deckCover,
      })
    );
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
          <SelectWrapper>{/*<BasicSelect />*/}</SelectWrapper>
          <InputTypeFileModal name="deckCover" control={control} modalKey={"update"} deckCover={deckCover} />
          <InputWrapper>
            <TextInputFormForModal
              name="question"
              label="Question"
              rules={{ required: "Question is required" }}
              control={control}
              errors={errors.question}
              defaultValue={modalData.question ? modalData.question : "How des it work in React?"}
            />
          </InputWrapper>
          <InputWrapper>
            <TextInputFormForModal
              name="answer"
              label="Answer"
              rules={{ required: "Answer is required" }}
              control={control}
              errors={errors.answer}
              defaultValue={modalData.answer ? modalData.answer : "It works..."}
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

// //------------------------------------------------------------------
// import React from "react";
// import { BasicModal, BasicSelect } from "reusableModal";
// import { ButtonComponent, ButtonComponentForm } from "reusableComponents";
// import { SubmitHandler, useForm } from "react-hook-form";
// import styled from "styled-components";
// import { useAppDispatch } from "app/hooks";
// import { TextInputFormForModal } from "reusableComponents";
// import { cardsThunks } from "features/cards/cards.slice";
// import { CardType } from "features/cards/cards.api";
//
// type PropsType = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   title: string;
//   modalData: CardType;
// };
//
// export type Inputs = {
//   question: string;
//   answer: string;
//   deckCover: string;
// };
//
// export const UpdateCardModal: React.FC<PropsType> = (props) => {
//   const { open, setOpen, title, modalData } = props;
//
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<Inputs>();
//
//   const dispatch = useAppDispatch();
//
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     // dispatch(cardsThunks.addCard({ question: data.question, answer: data.answer, cardsPack_id: paramsID }));
//     dispatch(
//         cardsThunks.updateCard({
//           ...modalData,
//           question: data.question,
//           answer: data.answer,
//           // questionImg: data.deckCover,
//         })
//     );
//     setOpen(false);
//     reset();
//   };
//
//   const setOpenHandler = () => {
//     setOpen(false);
//   };
//
//   return (
//       <BasicModal open={open} setOpen={setOpen} title={title}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FormWrapper>
//             <SelectWrapper>{/*<BasicSelect />*/}</SelectWrapper>
//
//             <InputWrapper>
//               <TextInputFormForModal
//                   name="question"
//                   label="Question"
//                   rules={{ required: "Question is required" }}
//                   control={control}
//                   errors={errors.question}
//                   defaultValue={modalData.question ? modalData.question : "How des it work in React?"}
//               />
//             </InputWrapper>
//             <InputWrapper>
//               <TextInputFormForModal
//                   name="answer"
//                   label="Answer"
//                   rules={{ required: "Answer is required" }}
//                   control={control}
//                   errors={errors.answer}
//                   defaultValue={modalData.answer ? modalData.answer : "It works..."}
//               />
//             </InputWrapper>
//
//             <TipicalWrapper>
//               <ButtonComponent variant={"outlined"} callback={setOpenHandler} buttonName={"cancel"} />
//               <ButtonComponentForm variant={"contained"} control={control} buttonName={"save"} />
//             </TipicalWrapper>
//           </FormWrapper>
//         </form>
//       </BasicModal>
//   );
// };
//
// const SelectWrapper = styled.div`
//   margin-left: 8px;
//   margin-top: 20px;
//   width: 413px;
// `;
//
// const FormWrapper = styled.span`
//   margin-right: 10px;
// `;
//
// const InputWrapper = styled.div`
//   margin-top: 20px;
// `;
//
// const TipicalWrapper = styled.div`
//   display: flex;
//   margin-top: 55px;
//   justify-content: space-around;
//
//   & > button {
//     width: 26%;
//   }
// `;
