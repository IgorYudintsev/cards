import * as React from "react";
import { useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useDebounce } from "utils/useDebounce";

type PropsType = {
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  payloadKey: "cards" | "packs";
  dispatchFoo: (newPage: number, newRowsPerPage: number) => void;
  conditionForPage0: boolean;
};

export const Pagination = ({ rowsPerPage, setRowsPerPage, payloadKey, dispatchFoo, conditionForPage0 }: PropsType) => {
  const maxCountPacks: number = useAppSelector((state) =>
    state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
  );
  const maxCountCards: number = useAppSelector((state) =>
    state.cards.cardsTotalCount !== null ? state.cards.cardsTotalCount : 10
  );

  const [page, setPage] = React.useState(0);
  const debouncedValue = useDebounce<number>(page, 500);

  useEffect(() => {
    if (!conditionForPage0) {
      dispatchFoo(page, rowsPerPage);
    }
  }, [debouncedValue]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    dispatchFoo(0, newRowsPerPage);
  };

  return (
    <TablePagination
      component="div"
      count={payloadKey === "packs" ? maxCountPacks : maxCountCards}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[10, 25, 50]}
    />
  );
};
