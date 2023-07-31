import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";

type TextInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  rules?: Record<string, unknown>;
  errors: FieldError | undefined;
  defaultValue: string;
};

export const TextInputForm: React.FC<TextInputProps> = (props) => {
  const { name, control, label, rules, errors, defaultValue } = props;
  const currentError = errors?.type === "required" ? "This field is required" : "Please enter a valid email address.";

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <>
          <TextField
            {...field}
            sx={{ m: 1 }}
            label={label}
            error={Boolean(fieldState.error)}
            variant="filled"
            defaultValue={field.value}
            fullWidth={true}
          />
          {errors && <span style={{ color: "red" }}>{currentError}</span>}
        </>
      )}
    />
  );
};
