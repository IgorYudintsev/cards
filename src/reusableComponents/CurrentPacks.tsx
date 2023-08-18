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
import { DeletePackModal, UpdatePackModal } from "reusableModal";
import styled from "styled-components";

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
  const [deckCover, setDeckCover] = useState("");

  const deleteHandler = (id: string, name: string) => {
    setModalData({ id, name });
    setOpenDelete(true);
    //dispatch(packsThunks.deletePack({ idForDelete: id, userID: userIDfromProfile }));
  };

  const updateHandler = (id: string, name: string) => {
    const currentItem = items.find((el) => el._id === id);
    if (currentItem) {
      setModalData({ id, name });
      setDeckCover(currentItem.deckCover);
    }

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
        pack={pack}
        modalData={modalData}
      />

      <UpdatePackModal
        open={open}
        setOpen={setOpen}
        name={modalData.name}
        title={"Update pack"}
        modalData={modalData}
        setModalData={setModalData}
        pack={pack}
        deckCover={deckCover}
      />

      {items.map((row) => (
        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row">
            <PictureWrapper>
              {row.deckCover !== undefined && <img src={row.deckCover} alt={""} style={{ width: 50 }} />}
              <NameWrapper>
                <span style={{ marginLeft: "7px" }}>{cutter(row.name, 13)}</span>
              </NameWrapper>
            </PictureWrapper>
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

const PictureWrapper = styled.span`
  display: flex;
`;
const NameWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
