import React from "react";
import { Control, Controller } from "react-hook-form";
import Button from "@mui/material/Button";

type ButtonProps = {
  variant: string;
  control: Control<any>;
  buttonName: string;
};

export const ButtonComponentForm: React.FC<ButtonProps> = ({ control, variant, buttonName }) => {
  return (
    <Controller
      name={variant}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Button variant="contained" type="submit">
            {buttonName}
          </Button>
        </>
      )}
    />
  );
};
