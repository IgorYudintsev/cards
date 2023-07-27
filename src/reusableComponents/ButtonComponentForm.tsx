import React from "react";
import { Control, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { useAppSelector } from "app/hooks";
import { isLoadingSelector } from "app/app.selectors";

type ButtonProps = {
  variant: string;
  control: Control<any>;
  buttonName: string;
};

export const ButtonComponentForm: React.FC<ButtonProps> = ({ control, variant, buttonName }) => {
  const isDesabled = useAppSelector(isLoadingSelector);
  return (
    <Controller
      name={variant}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Button variant="contained" type="submit" disabled={isDesabled}>
            {buttonName}
          </Button>
        </>
      )}
    />
  );
};
