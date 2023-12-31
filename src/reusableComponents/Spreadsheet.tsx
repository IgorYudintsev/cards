import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { HeadersType } from "components/Packs/Packs";
import { CurrentPacks } from "reusableComponents/CurrentPacks";
import { TableHeader } from "reusableComponents/TableHeader";
import { useAppSelector } from "app/hooks";
import { CurrentCards } from "reusableComponents/CurrentCards";
import { useLocation } from "react-router-dom";
import { packsSelector } from "features/packs/packs.selectors";
import { cardsSelector } from "features/cards/cards.selector";
import { GetPacksPayload } from "features/packs/packs.api";

type PropsType = {
  headers: HeadersType[];
  pack?: GetPacksPayload;
};
export const Spreadsheet: React.FC<PropsType> = (props) => {
  const { headers, pack } = props;
  const cards = useAppSelector(cardsSelector);
  const packs = useAppSelector(packsSelector);
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
    <div style={{ marginTop: "30px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableHeader headers={headers} sort={sort} />
            </TableRow>
          </TableHead>
          <TableBody>
            {location.pathname === "/packs" && pack ? (
              <CurrentPacks items={sortedPacks} pack={pack} />
            ) : (
              <CurrentCards items={cards} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {locationName.length === 0 && <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </div>
  );
};
