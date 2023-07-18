import React, { useEffect, useState } from "react";
import { packsActions, packsThunks } from "features/packs/packs.slice";
import styled from "styled-components";
import { AddPack, GetPacksPayload } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { useDebounce } from "utils/useDebounce";
import { loadState } from "utils/localStorage";
import { Spreadsheet } from "reusableComponents/Spreadsheet";
import { SearchFilter } from "reusableComponents/SearchFilter";
import { Pagination } from "reusableComponents/Pagination";
import { authThunks } from "features/auth/auth.slice";

export type HeadersType = {
  name: string;
  align: "left" | "center";
};

export type PayloadTypeForUpdate = {
  cardsPack: AddPack;
};

export const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.cardPacks);
  // const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [valueRange, setValueRange] = React.useState<number[]>([0, 10]); //RANGE
  const [titleSearch, setTitleSearch] = useState(""); //SEARCH
  const [searchValue, setTitleSearchValue] = useState<string | null>(null); //SEARCH
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR
  const [disabled, setDisabled] = useState(false);
  const debouncedValue = useDebounce<boolean>(disabled, 500);
  const logined = useAppSelector((state) => state.auth.profile);

  // if (!logined) {
  //   dispatch(authThunks.authMe());
  // }

  // const pack: GetPacksPayload = {
  //   min: valueRange[0],
  //   max: valueRange[1],
  //   pageCount: valueRange[1] - valueRange[0],
  //   packName: titleSearch,
  // };

  // const headers: HeadersType[] = [
  //   { name: "name", align: "left" },
  //   { name: "cards", align: "center" },
  //   { name: "last updated", align: "center" },
  //   { name: "created by", align: "center" },
  //   { name: "actions", align: "center" },
  // ];

  // const addPackHandler = () => {
  //   setDisabled(true);
  // };
  // useEffect(() => {
  //   const payload: PayloadTypeForUpdate = {
  //     cardsPack: { name: "MYPACK" },
  //   };
  //   if (debouncedValue == true) {
  //     dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
  //     setDisabled(false);
  //   }
  // }, [debouncedValue]);

  useEffect(() => {
    // if (!logined) {
    //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    //   dispatch(authThunks.authMe());
    // }
    //dispatch(packsThunks.getPacks({ pageCount: 8 }));
    // sessionStorage.setItem("cardsPack_id", "goToPacks");
    // setTitleSearchValue("ok");
    // dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
  }, []);

  return (
    <div>
      packs
      {/*<HeaderBlock>*/}
      {/*  <h1 style={{ marginTop: "-10px" }}>Packs list</h1>*/}
      {/*  <ButtonComponent buttonName={"Add new pack"} callback={addPackHandler} disabled={false} />*/}
      {/*</HeaderBlock>*/}
      {/*<SearchFilter*/}
      {/*  valueRange={valueRange}*/}
      {/*  setValueRange={setValueRange}*/}
      {/*  titleSearch={titleSearch}*/}
      {/*  searchValue={searchValue}*/}
      {/*  setTitleSearch={setTitleSearch}*/}
      {/*  setRowsPerPage={setRowsPerPage}*/}
      {/*  pack={pack}*/}
      {/*/>*/}
      {/*<Spreadsheet headers={headers} itemsKey={"packs"} />*/}
      {/*<PaginationStyle>*/}
      {/*  <Pagination rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} pack={pack} />*/}
      {/*</PaginationStyle>*/}
    </div>
  );
};

const PaginationStyle = styled.div`
  margin-left: 28%;
`;

const HeaderBlock = styled.div`
  margin-top: 20px;
  height: 35px;
  display: flex;
  justify-content: space-around;
`;
