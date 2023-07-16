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
import { useAppSelector } from "app/hooks";
import { CurrentCards } from "reusableComponents/CurrentCards";

type PropsType = {
  headers: HeadersType[];
  itemsKey: "packs" | "cards";
};
export const Spreadsheet: React.FC<PropsType> = (props) => {
  const { headers, itemsKey } = props;
  const cards = useAppSelector((state) => state.cards.cards);
  let [showCards, setShowCards] = useState(false);

  const items = useAppSelector((state) => state.packs.cardPacks);
  let [sortedPacks, setSortedPacks] = useState(items);
  let [sortHandler, setSortHandler] = useState(false);

  const sort = () => {
    setSortHandler(!sortHandler);
    let packData = [...items];
    if (sortHandler) {
      setSortedPacks(packData.sort((a, b) => a.cardsCount - b.cardsCount));
    }
    if (!sortHandler) {
      setSortedPacks(packData.sort((a, b) => b.cardsCount - a.cardsCount));
    }
  };

  useEffect(() => {
    setSortedPacks(items);
  }, [items]);

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
            {itemsKey === "packs" && <CurrentPacks items={sortedPacks} />}
            {itemsKey === "cards" && <CurrentCards items={cards} />}
          </TableBody>
        </Table>
      </TableContainer>
      {items.length === 0 || (cards.length === 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>)}
    </>
  );
};
