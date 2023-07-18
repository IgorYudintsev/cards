import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CardsPayload } from "features/cards/cards.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { HeadersType } from "components/Packs/Packs";
import { Spreadsheet } from "reusableComponents/Spreadsheet";
import { authThunks } from "features/auth/auth.slice";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);

  let params = useParams();
  let paramsID: string = params.id!.toString();
  const navigate = useNavigate();
  // const location = useLocation();
  //
  // console.log(location);

  const payload: CardsPayload = {
    cardsPack_id: paramsID,
    pageCount: 10,
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
    sessionStorage.setItem("cardsPack_id", paramsID);
    dispatch(cardsThunks.getCards(payload));
  }, []);

  // if (!logined) {
  //   dispatch(authThunks.authMe());
  // }

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
