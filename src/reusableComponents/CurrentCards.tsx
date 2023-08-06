import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CardType } from "features/cards/cards.api";
import { cutter } from "utils";
import { cardsThunks } from "features/cards/cards.slice";
import { isLoadingSelector } from "app/app.selectors";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";
import { EditPackModal, UpdateCardModal } from "reusableModal";

type PropsType = {
  items: CardType[];
};

export const CurrentCards = ({ items }: PropsType) => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const [open, setOpen] = useState(false); //MODAL
  const [modalData, setModalData] = useState<CardType>({ cardsPack_id: "" });

  const deleteHandler = (cardId: string | undefined, cardsPack_id: string | undefined) => {
    if (cardId && cardsPack_id) {
      dispatch(cardsThunks.deleteCard({ userID: cardId, cardsPack_id }));
    }
  };

  const updateHandler = (
    cardId: string | undefined,
    cardsPack_id: string | undefined,
    question: string | undefined,
    answer: string | undefined
  ) => {
    if (cardId && cardsPack_id) {
      setModalData({
        _id: cardId,
        cardsPack_id,
        question,
        answer,
      });
      setOpen(true);
      // const payload: CardType = {
      //   _id: cardId,
      //   cardsPack_id,
      //   question: "new question",
      // };
      // dispatch(cardsThunks.updateCard(payload));
    }
  };

  return (
    <>
      <UpdateCardModal open={open} setOpen={setOpen} title={"Update card"} modalData={modalData} />
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
                  onClick={() => updateHandler(row._id, row.cardsPack_id, row.question, row.answer)}
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
