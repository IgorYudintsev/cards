import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

export const Cards = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);
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
  const headersData = headers.map((el) => {
    return (
      <TableCell align={el.align}>
        <h3>
          <div title={"sort cards"} style={{ cursor: "pointer" }}>
            {el.name}
          </div>
        </h3>
      </TableCell>
    );
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{headersData}</TableRow>
          </TableHead>
          <TableBody>
            {cards.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.question}
                </TableCell>
                <TableCell size={"small"} align="center">
                  {row.answer}
                </TableCell>
                <TableCell size={"small"} align="center">
                  {cutter(`${row.created}`, 10)}
                </TableCell>
                <TableCell size={"small"} align="center">
                  {row.rating}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {cards.length == 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </>
  );
};
