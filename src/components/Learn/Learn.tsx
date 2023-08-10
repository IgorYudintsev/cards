import React, { useState } from "react";
import { S } from "features/cardsPacksStyles/CardsPacks_styles";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { cardsSelector } from "features/cards/cards.selector";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ButtonComponent } from "reusableComponents";
import styled from "styled-components";
import { cardsThunks } from "features/cards/cards.slice";

export const Learn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const comeBackPath = sessionStorage.getItem("cardsPATH");
  const allCards = useAppSelector(cardsSelector);
  let params = useParams();
  let id = params.cardId;
  let currentlearningCard = allCards.find((f) => (f._id === id ? f : ""));
  let [showAnswer, setShowAnswer] = useState(false);
  let [grade, setGrade] = useState(1);

  const backToCardsHandler = () => navigate(`${comeBackPath}`);

  const nextHandler = () => {
    if (id) {
      dispatch(cardsThunks.putGradeCard({ grade, card_id: id }));
    }
  };

  return (
    <Container fixed>
      <S.HeaderBlock>
        <h4 style={{ marginTop: "11px", cursor: "pointer" }} onClick={backToCardsHandler}>
          ⏪ Back to Cards
        </h4>
        <h1 style={{ marginTop: "-5px" }}>Learn Card list</h1>
      </S.HeaderBlock>

      <S.LearningBlock>
        <Paper elevation={2} style={{ width: "550px", height: "550px", padding: "20px" }}>
          <ContentWrapper>
            <div>
              <b>Question: </b>
              {currentlearningCard!.question}
              <S.Helper>Количество попыток ответов на вопрос:{currentlearningCard!.shots}</S.Helper>

              {!showAnswer && (
                <ContentWrapper>
                  <ButtonComponent buttonName={"Show answer"} callback={() => setShowAnswer(!showAnswer)} />
                </ContentWrapper>
              )}

              {showAnswer && (
                <AnswerWrapper>
                  <b>Answer: </b>
                  {currentlearningCard!.answer}

                  <FormWrapper>
                    <FormControl size={"small"}>
                      <b>Rate yourself:</b>
                      <RadioGroup
                        style={{ marginTop: "5px" }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio onClick={() => setGrade(1)} />}
                          label="Didn`t know"
                        />
                        <FormControlLabel value="2" control={<Radio onClick={() => setGrade(2)} />} label="Forgot" />
                        <FormControlLabel
                          value="3"
                          control={<Radio onClick={() => setGrade(3)} />}
                          label="A lot of thought"
                        />
                        <FormControlLabel value="4" control={<Radio onClick={() => setGrade(4)} />} label="Сonfused" />
                        <FormControlLabel
                          value="5"
                          control={<Radio onClick={() => setGrade(5)} />}
                          label="Knew the answer"
                        />
                      </RadioGroup>
                    </FormControl>
                  </FormWrapper>
                </AnswerWrapper>
              )}
              {showAnswer && (
                <ContentWrapper>
                  <ButtonComponent buttonName={"Next"} width={""} callback={nextHandler} />
                </ContentWrapper>
              )}
            </div>
          </ContentWrapper>
        </Paper>
      </S.LearningBlock>
    </Container>
  );
};

const FormWrapper = styled.div`
  margin-top: 10px;
`;

const AnswerWrapper = styled.div`
  margin-top: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
