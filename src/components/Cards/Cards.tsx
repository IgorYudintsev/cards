import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CardsPayload } from "features/cards/cards.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { HeadersType } from "components/Packs/Packs";
import { Spreadsheet } from "reusableComponents/Spreadsheet";
import { S } from "features/cardsPacksStyles/CardsPacks_styles";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { Pagination } from "reusableComponents/Pagination";
import { SearchFilter } from "reusableComponents/SearchFilter";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);
  let params = useParams();
  let paramsID: string = params.id!.toString();
  let paramsUserID: string = params.userID!.toString();
  const location = useLocation();
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR
  const [valueRange, setValueRange] = React.useState<number[]>([0, 100]); //RANGE
  const [titleSearch, setTitleSearch] = useState<string | null>(null); //SEARCH
  let [conditionForPage0, setConditionForPage0] = useState(true);

  const cards: CardsPayload = {
    cardsPack_id: paramsID,
    cardQuestion: titleSearch,
    min: valueRange[0],
    max: valueRange[1],
    pageCount: valueRange[1] - valueRange[0],
  };

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
    sessionStorage.setItem("cardsPATH", location.pathname);
    dispatch(cardsThunks.getCards(cards));
    setConditionForPage0(false);
  }, []);

  const addCardHandler = () => {
    dispatch(cardsThunks.addCard(cards));
  };

  const payloadKey = "cards";

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
      <SearchFilter
        valueRange={valueRange}
        setValueRange={setValueRange}
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        setRowsPerPage={setRowsPerPage}
        payloadCards={cards}
        payloadKey={payloadKey}
      />
      <Spreadsheet headers={headers} />

      <S.PaginationStyle>
        <Pagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          payloadKey={payloadKey}
          dispatchFoo={dispatchFoo}
          conditionForPage0={conditionForPage0}
        />
      </S.PaginationStyle>
    </>
  );
};
