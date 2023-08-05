import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";

type TextInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  rules?: Record<string, unknown>;
  errors: FieldError | undefined;
  defaultValue: string;
  defaultKey?: string;
};

export const TextInputFormForModal: React.FC<TextInputProps> = (props) => {
  const { name, control, label, rules, errors, defaultValue } = props;
  const currentError = errors?.type === "required" ? "This field is required" : "";
  const [defValue, setDefValue] = useState(defaultValue);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defValue}
      render={({ field, fieldState }) => (
        <>
          <TextField
            onChange={(e) => {
              setDefValue(e.currentTarget.value);
              field.onChange(e);
            }}
            sx={{ m: 1 }}
            label={currentError}
            error={Boolean(fieldState.error)}
            variant="filled"
            defaultValue={defaultValue}
            fullWidth={true}
          />
        </>
      )}
    />
  );
};
