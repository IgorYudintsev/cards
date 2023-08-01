import React, { useEffect, useState } from "react";
import { packsThunks } from "features/packs/packs.slice";
import { AddPack, GetPacksPayload } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ButtonComponent } from "reusableComponents";
import { loadState, useDebounce } from "utils";
import { Spreadsheet } from "reusableComponents";
import { SearchFilter } from "reusableComponents";
import { Pagination } from "reusableComponents";
import { S } from "features/cardsPacksStyles/CardsPacks_styles";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";
import { AddEditModal } from "reusableModal";

export type HeadersType = {
  name: string;
  align: "left" | "center";
};

export type PayloadTypeForUpdate = {
  cardsPack: AddPack;
};

export const Packs = () => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);
  const [valueRange, setValueRange] = React.useState<number[]>([0, 100]); //RANGE
  const [titleSearch, setTitleSearch] = useState<string | null>(null); //SEARCH
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR
  const [disabled, setDisabled] = useState(false);
  const debouncedValue = useDebounce<boolean>(disabled, 500);
  let [conditionForPage0, setConditionForPage0] = useState(true);

  const [open, setOpen] = React.useState(false); //MODAL

  const pack: GetPacksPayload = {
    min: valueRange[0],
    max: valueRange[1],
    pageCount: valueRange[1] - valueRange[0],
    packName: titleSearch,
  };

  const headers: HeadersType[] = [
    { name: "name", align: "left" },
    { name: "cards", align: "center" },
    { name: "last updated", align: "center" },
    { name: "created by", align: "center" },
    { name: "actions", align: "center" },
  ];

  const addPackHandler = () => {
    setOpen(true);
  };

  const dispatchFoo = (newPage: number, newRowsPerPage: number) => {
    dispatch(
      packsThunks.getPacks(
        loadState()
          ? { ...pack, user_id: userIDfromProfile, page: newPage + 1, pageCount: newRowsPerPage }
          : { ...pack, page: newPage + 1, pageCount: newRowsPerPage }
      )
    );
  };

  useEffect(() => {
    //dispatch(packsThunks.getPacks({ pageCount: 8 }));
    sessionStorage.setItem("cardsPATH", "/packs");
    // sessionStorage.setItem("cardsPack_id", "goToPacks");
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    setConditionForPage0(false);
  }, []);

  const payloadKey = "packs";

  return (
    <div>
      <AddEditModal open={open} setOpen={setOpen} name={"Add new Pack"} modalKey={"addPack"} title={"Add new pack"} />
      <S.HeaderBlock>
        <h1 style={{ marginTop: "-10px" }}>Packs list</h1>
        <ButtonComponent buttonName={"Add new pack"} callback={addPackHandler} disabled={false} />
      </S.HeaderBlock>
      <SearchFilter
        valueRange={valueRange}
        setValueRange={setValueRange}
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        setRowsPerPage={setRowsPerPage}
        payloadPacks={pack}
        payloadKey={payloadKey}
      />
      <Spreadsheet headers={headers} />
      <S.PaginationStyle>
        <Pagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          payloadKey={payloadKey}
          dispatchFoo={dispatchFoo}
          conditionForPage0={conditionForPage0}
        />
      </S.PaginationStyle>
    </div>
  );
};
