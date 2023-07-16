import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardsPayload } from "features/cards/cards.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { HeadersType } from "components/Packs/Packs";
import { Spreadsheet } from "reusableComponents/Spreadsheet";
import { authThunks } from "features/auth/auth.slice";

export const Cards = () => {
  const dispatch = useAppDispatch();

  let params = useParams();
  let paramsID: string = params.id!.toString();
  const navigate = useNavigate();
  const payload: CardsPayload = {
    cardsPack_id: paramsID,
    pageCount: 10,
  };
  console.log(navigate);
  useEffect(() => {
    dispatch(authThunks.authMe());
  }, []);

  // const logined = useAppSelector((state) => state.auth.profile);
  // if (!logined) {
  //   console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  //   dispatch(authThunks.authMe());
  // }

  const headers: HeadersType[] = [
    { name: "question", align: "left" },
    { name: "answer", align: "center" },
    { name: "created", align: "center" },
    { name: "rating", align: "center" },
    { name: "actions", align: "center" },
  ];

  useEffect(() => {
    //cardsApi.getCards(payload).then((res) => console.log(res.data));
    dispatch(cardsThunks.getCards(payload));
  }, []);

  const navigateHandler = (rowID: string) => {
    console.log("Пошел на...");
    // navigate(`/cards/${rowID}`);
  };

  return (
    <>
      <Spreadsheet headers={headers} itemsKey={"cards"} />
    </>
  );
};
