import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { packsThunks } from "features/packs/packs.slice";
import { GetPacksPayload } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { localHelper } from "utils/localStorage";
import { userIDfromProfileSelector } from "features/auth/auth.selectors";

function valuetext(value: number) {
  return `${value}°C`;
}

type PropsType = {
  setValue: (value: number[]) => void;
  value: number[];
  payloadPacks: GetPacksPayload;
};

export const RangeSlider: React.FC<PropsType> = ({ setValue, value, payloadPacks }) => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector(userIDfromProfileSelector);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      dispatch(packsThunks.getPacks(localHelper("myCards", userIDfromProfile, payloadPacks)));
    }
  };

  useEffect(() => {
    if (value[0] !== 0 || value[1] !== 100) {
      dispatch(packsThunks.getPacks(localHelper("myCards", userIDfromProfile, payloadPacks)));
    }
  }, []);

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};
