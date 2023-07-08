import React, { useState } from "react";
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

type PropsType = {
  sortedPacks: CardPacks[];
};

export const CurrentPacks = ({ sortedPacks }: PropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  //let [sortedPacks, setSortedPacks] = useState(packs);

  //let [showCards, setShowCards] = useState(false);
  const cutter = (str: string, cut: number) => {
    if (cut === 13) {
      return str.length > cut ? `${str.slice(0, cut)}...` : str;
    }
    return str.length > cut ? `${str.slice(0, cut)}` : str;
  };

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

  const navigateHandler = () => {
    navigate("/cards");
  };

  return (
    <>
      {sortedPacks.map((row) => (
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
            <IconButton aria-label="read" onClick={navigateHandler}>
              <SchoolIcon />
            </IconButton>
            {userIDfromProfile === row.user_id ? (
              <>
                <IconButton aria-label="delete" onClick={() => deleteHandler(row._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="update" onClick={() => updateHandler(row._id)}>
                  <EditIcon />
                </IconButton>
              </>
            ) : (
              ""
            )}
          </TableCell>
        </TableRow>
      ))}
      ;
    </>
  );
};
