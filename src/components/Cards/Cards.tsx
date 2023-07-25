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
import { Pagination } from "reusableComponents/Pagination";
import { GetPacksPayload } from "features/packs/packs.api";
import { packsThunks } from "features/packs/packs.slice";
import { loadState } from "utils/localStorage";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  //const cards = useAppSelector((state) => state.cards.cards);
  let params = useParams();
  let paramsID: string = params.id!.toString();
  let paramsUserID: string = params.userID!.toString();
  const location = useLocation();
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR

  const cards: CardsPayload = {
    // min: valueRange[0],
    // max: valueRange[1],
    // pageCount: valueRange[1] - valueRange[0],
    cardsPack_id: paramsID,
    pageCount: 10,
    // packName: titleSearch,
  };

  // const payloadAddCard: AddCardType = {
  //   cardsPack_id: paramsID,
  // };

  const headers: HeadersType[] = [
    { name: "question", align: "left" },
    { name: "answer", align: "center" },
    { name: "created", align: "center" },
    { name: "rating", align: "center" },
    { name: "actions", align: "center" },
  ];

  const dispatchFoo = (newPage: number, newRowsPerPage: number) => {
    dispatch(cardsThunks.getCards({ ...cards, page: newPage + 1, pageCount: newRowsPerPage }));
  };

  useEffect(() => {
    //cardsApi.getCards(payload).then((res) => console.log(res.data));
    sessionStorage.setItem("cardsPATH", location.pathname);
    dispatch(cardsThunks.getCards(cards));
  }, []);

  const addCardHandler = () => {
    dispatch(cardsThunks.addCard(cards));
  };

  return (
    <>
      <S.HeaderBlock>
        <h1 style={{ marginTop: "-10px" }}>Cards list</h1>
        <ButtonComponent
          buttonName={"Add new card"}
          callback={addCardHandler}
          disabled={userIDfromProfile !== paramsUserID}
        />
      </S.HeaderBlock>
      <Spreadsheet headers={headers} />
      <S.PaginationStyle>
        <Pagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          payloadKey={"cards"}
          dispatchFoo={dispatchFoo}
        />
      </S.PaginationStyle>
    </>
  );
};

//-------------------------------------------------------------------------------------------

// import React, { useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { AddCardType, CardsPayload } from "features/cards/cards.api";
// import { useAppDispatch, useAppSelector } from "app/hooks";
// import { cardsThunks } from "features/cards/cards.slice";
// import { HeadersType } from "components/Packs/Packs";
// import { Spreadsheet } from "reusableComponents/Spreadsheet";
// import { authThunks } from "features/auth/auth.slice";
// import { S } from "features/cardsPacksStyles/CardsPacks_styles";
// import { ButtonComponent } from "reusableComponents/ButtonComponent";
// import { Pagination } from "reusableComponents/Pagination";
// import { GetPacksPayload } from "features/packs/packs.api";
//
// export const Cards = () => {
//   const dispatch = useAppDispatch();
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   //const cards = useAppSelector((state) => state.cards.cards);
//   let params = useParams();
//   let paramsID: string = params.id!.toString();
//   let paramsUserID: string = params.userID!.toString();
//   const location = useLocation();
//   const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR
//
//   const cards: CardsPayload = {
//     // min: valueRange[0],
//     // max: valueRange[1],
//     // pageCount: valueRange[1] - valueRange[0],
//     cardsPack_id: paramsID,
//     pageCount: 10,
//     // packName: titleSearch,
//   };
//
//   const payloadAddCard: AddCardType = {
//     cardsPack_id: paramsID,
//   };
//
//   const headers: HeadersType[] = [
//     { name: "question", align: "left" },
//     { name: "answer", align: "center" },
//     { name: "created", align: "center" },
//     { name: "rating", align: "center" },
//     { name: "actions", align: "center" },
//   ];
//
//   useEffect(() => {
//     //cardsApi.getCards(payload).then((res) => console.log(res.data));
//     sessionStorage.setItem("cardsPATH", location.pathname);
//     dispatch(cardsThunks.getCards(cards));
//   }, []);
//
//   const addCardHandler = () => {
//     dispatch(cardsThunks.addCard(payloadAddCard));
//   };
//
//   return (
//       <>
//         <S.HeaderBlock>
//           <h1 style={{ marginTop: "-10px" }}>Cards list</h1>
//           <ButtonComponent
//               buttonName={"Add new card"}
//               callback={addCardHandler}
//               disabled={userIDfromProfile !== paramsUserID}
//           />
//         </S.HeaderBlock>
//         <Spreadsheet headers={headers} />
//         <S.PaginationStyle>
//           <Pagination rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} payload={cards} payloadKey={"cards"} />
//         </S.PaginationStyle>
//       </>
//   );
// };
