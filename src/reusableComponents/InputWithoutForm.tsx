import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { packsThunks } from "features/packs/packs.slice";
import { GetPacksPayload } from "../features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useDebounce } from "utils/useDebounce";
import { localHelper } from "utils/localStorage";

type PropsType = {
  titleSearch: string | null;
  setTitleSearch: (titleSearch: string | null) => void;
  pack: GetPacksPayload;
};

export const InputWithoutForm: React.FC<PropsType> = ({ titleSearch, setTitleSearch, pack }) => {
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
  const debouncedValue = useDebounce<string | null>(titleSearch, 500);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (titleSearch !== null) {
      dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, pack)));
    }
  }, [debouncedValue]);

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
