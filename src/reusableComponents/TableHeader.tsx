import React from "react";
import TableCell from "@mui/material/TableCell";
import { HeadersType } from "components/Packs/Packs";

type PropsType = {
  headers: HeadersType[];
  sort: () => void;
};

export const TableHeader: React.FC<PropsType> = (props) => {
  const { headers, sort } = props;

  return (
    <>
      {headers.map((el) => {
        let currentName = el.name === "cards";
        return (
          <TableCell align={el.align}>
            <h3>
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
