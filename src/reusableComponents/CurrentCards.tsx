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
import { CardType } from "features/cards/cards.api";
import { cutter } from "utils/cutter";
import { authThunks } from "features/auth/auth.slice";

type PropsType = {
  items: CardType[];
};

export const CurrentCards = ({ items }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const isLoading = useAppSelector((state) => state.app.isLoading);

  // useEffect(() => {
  //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  //   dispatch(authThunks.authMe());
  // }, []);

  // const deleteHandler = (id: string) => {
  //   dispatch(packsThunks.deletePack({ idForDelete: id, userID: userIDfromProfile }));
  // };
  //
  // const updateHandler = (id: string) => {
  //   const payload = {
  //     cardsPack: {
  //       _id: id,
  //       name: "UPDATED PACK",
  //     },
  //   };
  //   dispatch(packsThunks.updatePack({ payload, userID: userIDfromProfile }));
  // };

  const navigateHandler = (rowID: string) => {
    navigate(`/cards/${rowID}`);
  };

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
            {/*{userIDfromProfile === row.user_id ? (*/}
            {/*  <>*/}
            {/*    <IconButton aria-label="delete" disabled={isLoading}>*/}
            {/*      /!*onClick={() => deleteHandler(row._id)}*!/*/}
            {/*      <DeleteIcon />*/}
            {/*    </IconButton>*/}
            {/*    <IconButton aria-label="update" disabled={isLoading}>*/}
            {/*      /!*onClick={() => updateHandler(row._id)}*!/*/}
            {/*      <EditIcon />*/}
            {/*    </IconButton>*/}
            {/*  </>*/}
            {/*) : (*/}
            {/*  ""*/}
            {/*)}*/}
          </TableCell>
        </TableRow>
      ))}
      {/*{items.length === 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}*/}
    </>
  );
};
