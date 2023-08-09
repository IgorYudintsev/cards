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
import { CardPacks, GetPacksPayload } from "features/packs/packs.api";
import { cutter, saveState } from "utils";
import { DeletePackModal, EditPackModal } from "reusableModal";

type PropsType = {
  items: CardPacks[];
  pack: GetPacksPayload;
};

export const CurrentPacks = ({ items, pack }: PropsType) => {
  const navigate = useNavigate();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const [open, setOpen] = useState(false); //MODAL
  const [openDelete, setOpenDelete] = useState(false); //MODAL DELETE
  const [modalData, setModalData] = useState<{ id: string; name: string }>({ id: "", name: "" });

  const deleteHandler = (id: string, name: string) => {
    setModalData({ id, name });
    setOpenDelete(true);
    //dispatch(packsThunks.deletePack({ idForDelete: id, userID: userIDfromProfile }));
  };

  const updateHandler = (id: string, name: string) => {
    setModalData({ id, name });
    setOpen(true);
  };

  const navigateHandler = (rowUserID: string, rowID: string) => {
    navigate(`/cards/${rowUserID}/${rowID}`);
  };

  return (
    <>
      <DeletePackModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        title={"Delete pack"}
        modalData={modalData}
      />

      <EditPackModal
        open={open}
        setOpen={setOpen}
        name={modalData.name}
        title={"Update pack"}
        modalData={modalData}
        setModalData={setModalData}
        pack={pack}
        // defValue={defValue}
        // setDefValue={setDefValue}
      />

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
                <IconButton aria-label="delete" onClick={() => deleteHandler(row._id, row.name)} disabled={isLoading}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="update" onClick={() => updateHandler(row._id, row.name)} disabled={isLoading}>
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
