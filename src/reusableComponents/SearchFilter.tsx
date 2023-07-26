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
import { CardsPayload } from "features/cards/cards.api";

type PropsType = {
  titleSearch: string | null;
  setTitleSearch: (titleSearch: string | null) => void;
  valueRange: number[];
  setValueRange: (valueRange: number[]) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  // payload: GetPacksPayload | CardsPayload;
  payloadCards?: CardsPayload;
  payloadPacks?: GetPacksPayload;
  payloadKey: "packs" | "cards";
};

export const SearchFilter: React.FC<PropsType> = (props) => {
  const {
    valueRange,
    setValueRange,
    titleSearch,
    setTitleSearch,
    setRowsPerPage,
    payloadCards,
    payloadPacks,
    payloadKey,
  } = props;
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const [on, setOn] = useState("");
  const [variant, setVariant] = useState(false);
  const debouncedValue = useDebounce<string>(on, 1000);

  const allHandler = () => {
    deleteState();
    dispatch(packsThunks.getPacks({ ...payloadPacks, pageCount: 10 }));
  };

  const myHandler = () => {
    saveState();
    dispatch(packsThunks.getPacks({ ...payloadPacks, user_id: userIDfromProfile, pageCount: 10 }));
  };

  const cleanHandler = () => {
    dispatch(packsThunks.getPacks(loadState() ? { user_id: userIDfromProfile, pageCount: 10 } : { pageCount: 10 }));
    setValueRange([0, 100]);
    setTitleSearch("");
    setRowsPerPage(10);
  };

  useEffect(() => {
    switch (on) {
      case "CLEAN": {
        return cleanHandler();
      }
      case "MY": {
        setVariant(true);
        return myHandler();
      }
      case "ALL": {
        setVariant(false);
        return allHandler();
      }
    }
  }, [debouncedValue]);

  useEffect(() => {
    loadState() ? setVariant(true) : setVariant(false);
  }, []);

  return (
    <MainWrapper>
      {payloadKey === "packs" ? (
        <InputWithoutForm
          titleSearch={titleSearch}
          setTitleSearch={setTitleSearch}
          payloadPacks={payloadPacks}
          payloadKey={payloadKey}
        />
      ) : (
        <InputWithoutForm
          titleSearch={titleSearch}
          setTitleSearch={setTitleSearch}
          payloadCards={payloadCards}
          payloadKey={payloadKey}
        />
      )}

      {payloadKey === "packs" && (
        <div>
          <ButtonComponent
            buttonName={"My cards"}
            callback={() => setOn("MY")}
            disabled={false}
            variant={!variant ? "contained" : "outlined"}
          />
          <ButtonComponent
            buttonName={"All cards"}
            callback={() => setOn("ALL")}
            disabled={false}
            variant={variant ? "contained" : "outlined"}
          />
        </div>
      )}

      {payloadKey === "packs" && payloadPacks && (
        <RangeSlider value={valueRange} setValue={setValueRange} payloadPacks={payloadPacks} />
      )}

      <div title="reset filters">
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
