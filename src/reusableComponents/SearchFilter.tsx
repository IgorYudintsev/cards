import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { packsThunks } from "features/packs/packs.slice";
import { GetPacksPayload } from "features/packs/packs.api";
import { deleteState, loadState, saveState } from "utils/localStorage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useDebounce } from "utils/useDebounce";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { InputWithoutForm } from "./InputWithoutForm";
import { RangeSlider } from "reusableComponents/RangeSlider";
import IconButton from "@mui/material/IconButton";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

type PropsType = {
  //titleSearch: string;
  titleSearch: string | null;
  //setTitleSearch: (titleSearch: string) => void;
  setTitleSearch: (titleSearch: string | null) => void;
  valueRange: number[];
  setValueRange: (valueRange: number[]) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  pack: GetPacksPayload;
};

export const SearchFilter: React.FC<PropsType> = (props) => {
  const {
    valueRange,
    setValueRange,
    //searchValue,
    titleSearch,
    setTitleSearch,
    setRowsPerPage,
    pack,
    //setTitleSearchValue,
  } = props;
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [on, setOn] = useState("");
  const debouncedValue = useDebounce<string>(on, 1000);

  const allHandler = () => {
    deleteState();
    dispatch(packsThunks.getPacks(pack));
  };
  const myHandler = () => {
    saveState();
    dispatch(packsThunks.getPacks({ ...pack, user_id: userIDfromProfile }));
  };

  const cleanHandler = () => {
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    setValueRange([0, 10]);
    //setTitleSearch("");
    setTitleSearch("");
    setRowsPerPage(10);
  };

  useEffect(() => {
    switch (on) {
      case "CLEAN": {
        return cleanHandler();
      }
      case "MY": {
        return myHandler();
      }
      case "ALL": {
        return allHandler();
      }
    }

    // dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    // setValueRange([0, 10]);
    // setTitleSearch("");
  }, [debouncedValue]);

  return (
    <MainWrapper>
      <InputWithoutForm
        //searchValue={searchValue}
        // title={titleSearch}
        // setTitle={setTitleSearch}
        titleSearch={titleSearch}
        setTitleSearch={setTitleSearch}
        pack={pack}
      />
      <div>
        <ButtonComponent
          buttonName={"My packs"}
          //callback={myHandler}
          callback={() => setOn("MY")}
          disabled={false}
          variant={loadState() ? "contained" : "outlined"}
        />
        <ButtonComponent
          buttonName={"All packs"}
          //callback={allHandler}
          callback={() => setOn("ALL")}
          disabled={false}
          variant={!loadState() ? "contained" : "outlined"}
        />
      </div>
      <RangeSlider value={valueRange} setValue={setValueRange} pack={pack} />

      <div title="reset filters">
        {/*<IconButton aria-label="delete" onClick={cleanHandler}>*/}
        <IconButton aria-label="delete" onClick={() => setOn("CLEAN")}>
          <CleaningServicesIcon />
        </IconButton>
      </div>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
