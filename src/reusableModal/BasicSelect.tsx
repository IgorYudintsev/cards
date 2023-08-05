import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const BasicSelect = () => {
  const [select, setSelect] = React.useState("Text");

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={select}
          label="Choose a question format"
          onChange={handleChange}
        >
          <MenuItem value={"Text"}>Text</MenuItem>
          <MenuItem value={"Image"}>Image</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
