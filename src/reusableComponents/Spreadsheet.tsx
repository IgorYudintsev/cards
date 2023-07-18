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
import { TableHeader } from "reusableComponents/TableHeader";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CurrentCards } from "reusableComponents/CurrentCards";
import { useLocation } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";

type PropsType = {
  headers: HeadersType[];
  itemsKey: "packs" | "cards";
};
export const Spreadsheet: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();
  const logined = useAppSelector((state) => state.auth.profile);
  const { headers, itemsKey } = props;
  const cards = useAppSelector((state) => state.cards.cards);
  let [showCards, setShowCards] = useState(false);
  const packs = useAppSelector((state) => state.packs.cardPacks);
  const location = useLocation();
  const locationName = location.pathname.split("/")[1] === "packs" ? packs : cards;

  let [sortedPacks, setSortedPacks] = useState(packs);
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeader headers={headers} setShowCards={setShowCards} sort={sort} />
            </TableRow>
          </TableHead>
          <TableBody>
            {location.pathname === "/packs" ? <CurrentPacks items={sortedPacks} /> : <CurrentCards items={cards} />}
          </TableBody>
        </Table>
      </TableContainer>
      {locationName.length === 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </>
  );
};
