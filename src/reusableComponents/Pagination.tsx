import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

import { packsThunks } from "features/packs/packs.slice";
import { useEffect } from "react";
import { GetPacksPayload } from "features/packs/packs.api";
import { loadState } from "utils/localStorage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useDebounce } from "utils/useDebounce";

type PropsType = {
  pack: GetPacksPayload;
};

export const Pagination = ({ pack }: PropsType) => {
  const maxCardsCount: number = useAppSelector((state) =>
    state.packs.cardPacksTotalCount !== null ? state.packs.cardPacksTotalCount : 10
  );
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState(0);
  const debouncedValue = useDebounce<number>(page, 500);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    dispatchFoo();
  }, [debouncedValue]);

  const dispatchFoo = (newPage: number = page, newRowsPerPage: number = rowsPerPage) => {
    dispatch(
      packsThunks.getPacks(
        loadState()
          ? { ...pack, user_id: userIDfromProfile, page: newPage + 1, pageCount: newRowsPerPage }
          : { ...pack, page: newPage + 1, pageCount: newRowsPerPage }
      )
    );
  };

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
      count={maxCardsCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[10, 25, 50]}
    />
  );
};
