import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardsApi, CardsPayload } from "features/cards/cards.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { HeadersType } from "components/Packs/Packs";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";

import TableBody from "@mui/material/TableBody";
import { Spreadsheet } from "reusableComponents/Spreadsheet";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cards = useAppSelector((state) => state.cards.cards);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  let params = useParams();
  let paramsID: string = params.id!.toString();
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

  const cutter = (str: string, cut: number) => {
    if (cut === 13) {
      return str.length > cut ? `${str.slice(0, cut)}...` : str;
    }
    return str.length > cut ? `${str.slice(0, cut)}` : str;
  };

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
      {cards.length == 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </>
  );
};
