import React from "react";
import { Control, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { useAppSelector } from "app/hooks";
import { isLoadingSelector } from "app/app.selectors";

type ButtonProps = {
  variant: string;
  control: Control<any>;
  buttonName: string;
  color?: string;
};

export const ButtonComponentForm: React.FC<ButtonProps> = ({ control, variant, buttonName, color }) => {
  const isDesabled = useAppSelector(isLoadingSelector);
  return (
    <Controller
      name={buttonName}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Button variant="contained" type="submit" disabled={isDesabled} color={color ? "error" : "primary"}>
            {buttonName}
          </Button>
        </>
      )}
    />
  );
};
