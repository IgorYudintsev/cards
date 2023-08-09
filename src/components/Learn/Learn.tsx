import React, { useState } from "react";
import { S } from "features/cardsPacksStyles/CardsPacks_styles";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { cardsSelector } from "features/cards/cards.selector";
import { useAppSelector } from "app/hooks";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ButtonComponent } from "reusableComponents";
import styled from "styled-components";

export const Learn = () => {
  const navigate = useNavigate();
  const comeBackPath = sessionStorage.getItem("cardsPATH");
  const allCards = useAppSelector(cardsSelector);
  let params = useParams();
  let id = params.cardId;
  let currentlearningCard = allCards.find((f) => (f._id === id ? f : ""));
  let [showAnswer, setShowAnswer] = useState(false);
  let [raiting, setRaiting] = useState(1);
  console.log(raiting);

  const backToCardsHandler = () => navigate(`${comeBackPath}`);

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
              <S.Helper>Количество попыток ответов на вопрос:</S.Helper>

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
                          control={<Radio onClick={() => setRaiting(1)} />}
                          label="Didn`t know"
                        />
                        <FormControlLabel value="2" control={<Radio onClick={() => setRaiting(2)} />} label="Forgot" />
                        <FormControlLabel
                          value="3"
                          control={<Radio onClick={() => setRaiting(3)} />}
                          label="A lot of thought"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio onClick={() => setRaiting(4)} />}
                          label="Сonfused"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio onClick={() => setRaiting(5)} />}
                          label="Knew the answer"
                        />
                      </RadioGroup>
                    </FormControl>
                  </FormWrapper>
                </AnswerWrapper>
              )}
              {showAnswer && (
                <ContentWrapper>
                  <ButtonComponent buttonName={"Next"} width={""} callback={() => {}} />
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
  //ext-align: center;
`;

// style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}

const AnswerWrapper = styled.div`
  margin-top: 20px;

  //display: flex;
  //justify-content: space-around;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

//------------------------------------------------------------------------------
//
// const cards = useAppSelector(cardsSelector);
// let [toggle, setToggle] = useState("question");
// let [raiting, setRaiting] = useState(0);
// let params = useParams();
// let id = params.cardId;
// let card = cards.filter((f) => (f._id === id ? f : ""));
// let buttonHandler = () => {
//   instance.put("/cards/grade", { grade: raiting, card_id: id }).then((res) => {
//     console.log(res);
//   });
// };
// return (
//   <>
//     <S.HeaderBlock>
//       <h1>Learn "Pack Name"</h1>
//     </S.HeaderBlock>
//     <Container style={{ marginTop: "80px", textAlign: "center" }}>
//       <p>
//         <b>Question:</b>
//         {card[0].question ? card[0].question : ""}
//       </p>
//       <p>Количество попыток ответов на вопрос:{card[0].grade ? card[0].grade : 0}</p>
//       Rate yourself:
//       {toggle == "answer" && (
//         <div>
//           <p>
//             <b>Answer:</b>
//             {card[0].answer ? card[0].answer : ""}
//           </p>
//           <div>
//             <p onClick={() => setRaiting(5)}>
//               <input type="radio" name={"5"} />
//               Knew the answer
//             </p>
//             <p onClick={() => setRaiting(4)}>
//               <input type="radio" name={"4"} />
//               Сonfused
//             </p>
//             <p onClick={() => setRaiting(3)}>
//               <input type="radio" name={"3"} />A lot of thought
//             </p>
//             <p onClick={() => setRaiting(2)}>
//               <input type="radio" name={"2"} />
//               Forgot
//             </p>
//             <p onClick={() => setRaiting(1)}>
//               <input type="radio" name={"1"} />
//               Did not know
//             </p>
//           </div>
//           <ButtonComponent
//             buttonName={"next"}
//             callback={() => buttonHandler()}
//             disabled={false}
//             variant={"contained"}
//           />
//         </div>
//       )}
//       {toggle == "question" && (
//         <ButtonComponent
//           buttonName={"Show answer"}
//           callback={() => setToggle("answer")}
//           disabled={false}
//           variant={"contained"}
//         />
//       )}
//     </Container>
//   </>
// );
