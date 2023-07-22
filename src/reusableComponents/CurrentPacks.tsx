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
import { cutter } from "utils/cutter";

type PropsType = {
  items: CardPacks[];
};

export const CurrentPacks = ({ items }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const deleteHandler = (id: string) => {
    dispatch(packsThunks.deletePack({ idForDelete: id, userID: userIDfromProfile }));
  };

  const updateHandler = (id: string) => {
    const payload = {
      cardsPack: {
        _id: id,
        name: "UPDATED PACK",
      },
    };
    dispatch(packsThunks.updatePack({ payload, userID: userIDfromProfile }));
  };

  const navigateHandler = (rowUserID: string, rowID: string) => {
    navigate(`/cards/${rowUserID}/${rowID}`);
  };

  return (
    <>
      {items.map((row) => (
        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row">
            {cutter(row.name, 13)}
          </TableCell>
          <TableCell size={"small"} align="center">
            {row.cardsCount}
          </TableCell>
          <TableCell size={"small"} align="center">
            {cutter(row.updated, 10)}
          </TableCell>
          <TableCell size={"small"} align="center">
            {cutter(row.user_name, 13)}
          </TableCell>
          <TableCell size={"small"} align="center">
            <IconButton aria-label="read" onClick={() => navigateHandler(row.user_id, row._id)} disabled={isLoading}>
              <SchoolIcon />
            </IconButton>
            {userIDfromProfile === row.user_id ? (
              <>
                <IconButton aria-label="delete" onClick={() => deleteHandler(row._id)} disabled={isLoading}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="update" onClick={() => updateHandler(row._id)} disabled={isLoading}>
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
