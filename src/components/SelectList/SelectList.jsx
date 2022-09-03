import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectList = ({ handleChange, selectConfig, value }) => {
  return (
    <FormControl size="small" sx={{ marginTop: "3rem" }}>
      <InputLabel id={selectConfig.labelID}>{selectConfig.label}</InputLabel>
      <Select
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        labelId={selectConfig.labelID}
        id={selectConfig.selectID}
        label={selectConfig.label}
        value={value}
      >
        {selectConfig.items.map((item, idx) => {
          return (
            <MenuItem key={idx} value={item.value}>
              {item.inner}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectList;
