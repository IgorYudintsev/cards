import React from "react";
import TableCell from "@mui/material/TableCell";
import { CardPacks } from "features/packs/packs.api";
import { HeadersType } from "components/Packs/Packs";

type PropsType = {
  headers: HeadersType[];
  setShowCards: (showCards: boolean) => void;
  sort: () => void;
};

export const TableHeader: React.FC<PropsType> = (props) => {
  const { headers, setShowCards, sort } = props;

  return (
    <>
      {headers.map((el) => {
        let currentName = el.name === "cards";
        return (
          <TableCell align={el.align}>
            <h3 onMouseOver={() => setShowCards(true)} onMouseLeave={() => setShowCards(false)}>
              {currentName ? (
                <div title={"sort cards"} style={{ cursor: "pointer" }} onClick={() => sort()}>
                  {el.name}
                </div>
              ) : (
                <div> {el.name} </div>
              )}
            </h3>
          </TableCell>
        );
      })}
    </>
  );
};
