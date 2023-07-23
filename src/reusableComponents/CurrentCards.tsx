import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { CardPacks } from "features/packs/packs.api";
import { AddCardType, CardType } from "features/cards/cards.api";
import { cutter } from "utils/cutter";
import { authThunks } from "features/auth/auth.slice";
import { cardsThunks } from "features/cards/cards.slice";

type PropsType = {
  items: CardType[];
};

export const CurrentCards = ({ items }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const deleteHandler = (cardId: string | undefined, cardsPack_id: string | undefined) => {
    if (cardId && cardsPack_id) {
      dispatch(cardsThunks.deleteCard({ userID: cardId, cardsPack_id }));
    }
  };

  const updateHandler = (cardId: string | undefined, cardsPack_id: string | undefined) => {
    if (cardId && cardsPack_id) {
      const payload: CardType = {
        _id: cardId,
        cardsPack_id,
        question: "new question",
      };
      dispatch(cardsThunks.updateCard(payload));
    }
  };

  // const navigateHandler = (rowID: ) => {
  //   navigate(`/cards/${rowID}`);
  // };

  return (
    <>
      {items.map((row) => (
        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row">
            {cutter(`${row.question}`, 13)}
          </TableCell>
          <TableCell size={"small"} align="center">
            {cutter(`${row.answer}`, 13)}
          </TableCell>
          <TableCell size={"small"} align="center">
            {cutter(`${row.created}`, 10)}
          </TableCell>
          <TableCell size={"small"} align="center">
            {cutter(`${row.rating}`, 13)}
          </TableCell>
          <TableCell size={"small"} align="center">
            <IconButton aria-label="read" disabled={isLoading}>
              {/*onClick={() => navigateHandler(row._id)}*/}
              <SchoolIcon />
            </IconButton>
            {userIDfromProfile === row.user_id ? (
              <>
                <IconButton
                  aria-label="delete"
                  disabled={isLoading}
                  onClick={() => deleteHandler(row._id, row.cardsPack_id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="update"
                  disabled={isLoading}
                  onClick={() => updateHandler(row._id, row.cardsPack_id)}
                >
                  <EditIcon />
                </IconButton>
              </>
            ) : (
              ""
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
