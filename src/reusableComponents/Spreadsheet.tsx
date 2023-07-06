import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { CardPacks, GetPacksPayload } from "features/packs/packs.api";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { packsThunks } from "features/packs/packs.slice";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { HeadersType } from "components/Packs/Packs";

type PropsType = {
  tableName: string;
  packs: CardPacks[];
  headers: HeadersType[];
  valueRange: number[];
  setValueRange: (valueRange: number[]) => void;
  titleSearch: string;
  setTitleSearch: (titleSearch: string) => void;
  pack: GetPacksPayload;
};
export const Spreadsheet: React.FC<PropsType> = (props) => {
  const { tableName, packs, headers, valueRange, setValueRange, titleSearch, setTitleSearch, pack } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  let [sortedPacks, setSortedPacks] = useState(packs);

  let [showCards, setShowCards] = useState(false);
  let [sortHandler, setSortHandler] = useState(false);

  const sort = () => {
    setSortHandler(!sortHandler);
    let packData = [...packs];
    if (sortHandler) {
      setSortedPacks(packData.sort((a, b) => a.cardsCount - b.cardsCount));
    }
    if (!sortHandler) {
      setSortedPacks(packData.sort((a, b) => b.cardsCount - a.cardsCount));
    }
  };

  useEffect(() => {
    setSortedPacks(packs);
  }, [packs]);

  const cutter = (str: string, cut: number) => {
    if (cut === 13) {
      return str.length > cut ? `${str.slice(0, cut)}...` : str;
    }
    return str.length > cut ? `${str.slice(0, cut)}` : str;
  };

  const headersData = headers.map((el) => {
    let currentName = el.name === "cards";
    return (
      <TableCell align={el.align}>
        <h3 onMouseOver={() => setShowCards(true)} onMouseLeave={() => setShowCards(false)}>
          {currentName ? (
            <div title={"sort cards"} style={{ cursor: "pointer" }} onClick={sort}>
              {el.name}
            </div>
          ) : (
            <div> {el.name} </div>
          )}
        </h3>
      </TableCell>
    );
  });
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

  const currentPacks = sortedPacks.map((row) => (
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
  ));

  return (
    <>
      {/*<SearchFilter*/}
      {/*  valueRange={valueRange}*/}
      {/*  setValueRange={setValueRange}*/}
      {/*  titleSearch={titleSearch}*/}
      {/*  setTitleSearch={setTitleSearch}*/}
      {/*  pack={pack}*/}
      {/*/>*/}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{headersData}</TableRow>
          </TableHead>
          <TableBody>{currentPacks}</TableBody>
        </Table>
      </TableContainer>
      {packs.length == 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </>
  );
};
