import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddCardType, CardsPayload } from "features/cards/cards.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { HeadersType } from "components/Packs/Packs";
import { Spreadsheet } from "reusableComponents/Spreadsheet";
import { authThunks } from "features/auth/auth.slice";
import { S } from "features/cardsPacksStyles/CardsPacks_styles";
import { ButtonComponent } from "reusableComponents/ButtonComponent";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  let params = useParams();
  let paramsID: string = params.id!.toString();
  let paramsUserID: string = params.userID!.toString();
  const location = useLocation();
  //console.log(location.pathname);

  // const location = useLocation();
  //
  // console.log(location);

  const payload: CardsPayload = {
    cardsPack_id: paramsID,
    pageCount: 10,
  };

  const payloadAddCard: AddCardType = {
    cardsPack_id: paramsID,
  };

  const headers: HeadersType[] = [
    { name: "question", align: "left" },
    { name: "answer", align: "center" },
    { name: "created", align: "center" },
    { name: "rating", align: "center" },
    { name: "actions", align: "center" },
  ];

  useEffect(() => {
    //cardsApi.getCards(payload).then((res) => console.log(res.data));
    sessionStorage.setItem("cardsPATH", location.pathname);
    dispatch(cardsThunks.getCards(payload));
  }, []);

  const addCardHandler = () => {
    dispatch(cardsThunks.addCard(payloadAddCard));
  };

  return (
    <>
      <S.HeaderBlock>
        <h1 style={{ marginTop: "-10px" }}>Packs list</h1>
        <ButtonComponent
          buttonName={"Add new pack"}
          callback={addCardHandler}
          disabled={userIDfromProfile !== paramsUserID}
        />
      </S.HeaderBlock>
      <Spreadsheet headers={headers} />
    </>
  );
};
