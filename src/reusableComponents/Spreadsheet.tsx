import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { CardPacks } from "features/packs/packs.api";
import { HeadersType } from "components/Packs/Packs";
import { CurrentPacks } from "reusableComponents/CurrentPacks";

type PropsType = {
  packs: CardPacks[];
  headers: HeadersType[];
};
export const Spreadsheet: React.FC<PropsType> = (props) => {
  const { packs, headers } = props;

  let [sortedPacks, setSortedPacks] = useState(packs);
  //
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>{headersData}</TableRow>
          </TableHead>
          <TableBody>
            <CurrentPacks sortedPacks={sortedPacks} />
          </TableBody>
        </Table>
      </TableContainer>
      {packs.length == 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </>
  );
};
