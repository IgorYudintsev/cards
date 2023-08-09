import React from "react";
import Button from "@mui/material/Button";

type PropsType = {
  buttonName: string;
  callback: () => void;
  disabled?: boolean;
  variant?: "contained" | "outlined";
  width?: string;
};

export const ButtonComponent: React.FC<PropsType> = ({
  buttonName,
  callback,
  disabled = false,
  variant = "contained",
  width,
}) => {
  const onclickHandler = () => {
    callback();
  };
  return (
    <Button
      style={{ marginLeft: "3px", width: width ? "50px" : "250px" }}
      variant={variant}
      type="submit"
      onClick={onclickHandler}
      disabled={disabled}
    >
      {buttonName}
    </Button>
  );
};
