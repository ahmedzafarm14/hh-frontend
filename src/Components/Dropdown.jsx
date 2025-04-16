import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BackgroundColor, AccentColor3 } from "../Theme/ColorBoilerplate";

export default function BasicSelect({
  value,
  onSelectChange,
  options,
  placeholder,
}) {
  return (
    <Box className="mb-2">
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={value}
          onChange={onSelectChange}
          displayEmpty
          size="small"
          sx={{
            backgroundColor: BackgroundColor,
            "& .MuiSelect-select": {
              color: value === "" ? AccentColor3 : "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          {/* Placeholder as MenuItem */}
          <MenuItem value="" disabled sx={{ color: "gray" }}>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
