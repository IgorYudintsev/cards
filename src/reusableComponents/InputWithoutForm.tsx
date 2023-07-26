import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { packsThunks } from "features/packs/packs.slice";
import { GetPacksPayload } from "../features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useDebounce } from "utils/useDebounce";
import { loadState, localHelper } from "utils/localStorage";
import { CardsPayload } from "features/cards/cards.api";
import { cardsThunks } from "features/cards/cards.slice";

type PropsType = {
  titleSearch: string | null;
  setTitleSearch: (titleSearch: string | null) => void;
  // payload: CardsPayload | GetPacksPayload;
  payloadCards?: CardsPayload;
  payloadPacks?: GetPacksPayload;
  payloadKey: "packs" | "cards";
};

export const InputWithoutForm: React.FC<PropsType> = ({
  titleSearch,
  setTitleSearch,
  payloadCards,
  payloadPacks,
  // payload,
  payloadKey,
}) => {
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const debouncedValue = useDebounce<string | null>(titleSearch, 500);
  const dispatch = useAppDispatch();

  // export const localHelper = (userID: string, params: Object) => {
  //   return loadState() ? { ...params, user_id: userID } : params;
  // };

  useEffect(() => {
    if (titleSearch !== null) {
      if (payloadPacks) {
        dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, payloadPacks)));
      }
      if (payloadCards) {
        dispatch(cardsThunks.getCards(payloadCards));
      }
    }
  }, [debouncedValue]);

  // useEffect(() => {
  //   if (titleSearch !== null) {
  //     if(payloadPacks){
  //       dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, payloadPacks)));
  //     }
  //     if(payloadCards){
  //       dispatch(cardsThunks.getCards(payloadCards));
  //
  //     }
  //   }
  // }, [debouncedValue]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitleSearch(e.currentTarget.value);
  };

  return (
    <TextField
      value={titleSearch}
      size={"small"}
      id="outlined-uncontrolled"
      label="Search..."
      defaultValue=""
      onChange={onChangeHandler}
    />
  );
};
