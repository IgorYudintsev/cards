import React, { useEffect, useState } from "react";
import { packsThunks } from "features/packs/packs.slice";
import styled from "styled-components";
import { AddPack, GetPacksPayload } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { useDebounce } from "utils/useDebounce";
import { loadState } from "utils/localStorage";
import { Spreadsheet } from "reusableComponents/Spreadsheet";
import { SearchFilter } from "reusableComponents/SearchFilter";
import { Pagination } from "reusableComponents/Pagination";
import { S } from "features/cardsPacksStyles/CardsPacks_styles";

export type HeadersType = {
  name: string;
  align: "left" | "center";
};

export type PayloadTypeForUpdate = {
  cardsPack: AddPack;
};

export const Packs = () => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [valueRange, setValueRange] = React.useState<number[]>([0, 100]); //RANGE
  const [titleSearch, setTitleSearch] = useState<string | null>(null); //SEARCH
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR
  const [disabled, setDisabled] = useState(false);
  const debouncedValue = useDebounce<boolean>(disabled, 500);

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
    setDisabled(true);
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
    const payload: PayloadTypeForUpdate = {
      cardsPack: { name: "MYPACK" },
    };
    if (debouncedValue) {
      dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
      setDisabled(false);
    }
  }, [debouncedValue]);

  useEffect(() => {
    //dispatch(packsThunks.getPacks({ pageCount: 8 }));
    sessionStorage.setItem("cardsPATH", "/packs");
    // sessionStorage.setItem("cardsPack_id", "goToPacks");
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
  }, []);

  return (
    <div>
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
        pack={pack}
      />
      <Spreadsheet headers={headers} />
      <S.PaginationStyle>
        <Pagination
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          //payload={pack}
          payloadKey={"packs"}
          dispatchFoo={dispatchFoo}
        />
      </S.PaginationStyle>
    </div>
  );
};

//-------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { packsThunks } from "features/packs/packs.slice";
// import styled from "styled-components";
// import { AddPack, GetPacksPayload } from "features/packs/packs.api";
// import { useAppDispatch, useAppSelector } from "app/hooks";
// import { ButtonComponent } from "reusableComponents/ButtonComponent";
// import { useDebounce } from "utils/useDebounce";
// import { loadState } from "utils/localStorage";
// import { Spreadsheet } from "reusableComponents/Spreadsheet";
// import { SearchFilter } from "reusableComponents/SearchFilter";
// import { Pagination } from "reusableComponents/Pagination";
// import { S } from "features/cardsPacksStyles/CardsPacks_styles";
//
// export type HeadersType = {
//   name: string;
//   align: "left" | "center";
// };
//
// export type PayloadTypeForUpdate = {
//   cardsPack: AddPack;
// };
//
// export const Packs = () => {
//   const dispatch = useAppDispatch();
//   const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
//   const [valueRange, setValueRange] = React.useState<number[]>([0, 10]); //RANGE
//   const [titleSearch, setTitleSearch] = useState<string | null>(null); //SEARCH
//   const [rowsPerPage, setRowsPerPage] = React.useState(10); //PAGINATOR
//   const [disabled, setDisabled] = useState(false);
//   const debouncedValue = useDebounce<boolean>(disabled, 500);
//
//   const pack: GetPacksPayload = {
//     min: valueRange[0],
//     max: valueRange[1],
//     pageCount: valueRange[1] - valueRange[0],
//     packName: titleSearch,
//   };
//
//   const headers: HeadersType[] = [
//     { name: "name", align: "left" },
//     { name: "cards", align: "center" },
//     { name: "last updated", align: "center" },
//     { name: "created by", align: "center" },
//     { name: "actions", align: "center" },
//   ];
//
//   const addPackHandler = () => {
//     setDisabled(true);
//   };
//   useEffect(() => {
//     const payload: PayloadTypeForUpdate = {
//       cardsPack: { name: "MYPACK" },
//     };
//     if (debouncedValue) {
//       dispatch(packsThunks.addPack({ userIDfromProfile: userIDfromProfile, payload }));
//       setDisabled(false);
//     }
//   }, [debouncedValue]);
//
//   useEffect(() => {
//     //dispatch(packsThunks.getPacks({ pageCount: 8 }));
//     sessionStorage.setItem("cardsPATH", "/packs");
//
//     // sessionStorage.setItem("cardsPack_id", "goToPacks");
//     dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
//   }, []);
//
//   return (
//       <div>
//         <S.HeaderBlock>
//           <h1 style={{ marginTop: "-10px" }}>Packs list</h1>
//           <ButtonComponent buttonName={"Add new pack"} callback={addPackHandler} disabled={false} />
//         </S.HeaderBlock>
//         <SearchFilter
//             valueRange={valueRange}
//             setValueRange={setValueRange}
//             titleSearch={titleSearch}
//             setTitleSearch={setTitleSearch}
//             setRowsPerPage={setRowsPerPage}
//             pack={pack}
//         />
//         <Spreadsheet headers={headers} />
//         <S.PaginationStyle>
//           <Pagination rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} payload={pack} payloadKey={"packs"} />
//         </S.PaginationStyle>
//       </div>
//   );
// };
