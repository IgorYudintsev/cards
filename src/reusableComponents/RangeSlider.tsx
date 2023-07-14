import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { packsThunks } from "features/packs/packs.slice";

import { useEffect } from "react";
import { GetPacksPayload } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { localHelper } from "utils/localStorage";

function valuetext(value: number) {
  return `${value}°C`;
}
type PropsType = {
  setValue: (value: number[]) => void;
  value: number[];
  pack: GetPacksPayload;
};

export const RangeSlider: React.FC<PropsType> = ({ setValue, value, pack }) => {
  const dispatch = useAppDispatch();
  const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
    if (Array.isArray(value)) {
      dispatch(packsThunks.getPacks(localHelper(userIDfromProfile, pack)));
    }
  };
  useEffect(() => {
    if (value[0] !== 0 || value[1] !== 10) {
      packsThunks.getPacks(localHelper(userIDfromProfile, pack));
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