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
import { DeletePackModal, EditPackModal, UpdateCardModal } from "reusableModal";
import { DeleteCardModal } from "reusableModal/DeleteCardModal";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

type PropsType = {
  items: CardType[];
};

export const CurrentCards = ({ items }: PropsType) => {
  const navigate = useNavigate();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const [open, setOpen] = useState(false); //MODAL
  const [openDelete, setOpenDelete] = useState(false); //MODAL DELETE
  const [modalData, setModalData] = useState<CardType>({ cardsPack_id: "" });
  const [modalDataDELETE, setModalDataDELETE] = useState({ question: "", user_id: "", cardsPack_id: "" });

  const deleteHandler = (
    question: string | undefined,
    cardId: string | undefined,
    cardsPack_id: string | undefined
  ) => {
    if (cardId && cardsPack_id && question) {
      setModalDataDELETE({ question, user_id: cardId, cardsPack_id });
      setOpenDelete(true);
      // dispatch(cardsThunks.deleteCard({ userID: cardId, cardsPack_id }));
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
    }
  };

  const navigateHandler = (card_id: string | undefined) => {
    navigate(`/learn/${card_id}`);
  };

  return (
    <>
      <DeleteCardModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        title={"Delete pack"}
        modalDataDELETE={modalDataDELETE}
      />
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
            <Rating name="half-rating-read" defaultValue={row.grade} precision={0.5} readOnly />
          </TableCell>
          <TableCell size={"small"} align="center">
            <IconButton aria-label="read" disabled={isLoading} onClick={() => navigateHandler(row._id)}>
              <SchoolIcon />
            </IconButton>
            {userIDfromProfile === row.user_id ? (
              <>
                <IconButton
                  aria-label="delete"
                  disabled={isLoading}
                  onClick={() => deleteHandler(row.question, row._id, row.cardsPack_id)}
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
