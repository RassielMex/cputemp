import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";

const GraphForm = ({ handleChange, core, handleClick }) => {
  const ctrl = {
    labelID: "label_core",
    selectID: "core",
    label: "Core",
    items: [
      { value: 0, inner: "Core 1" },
      { value: 1, inner: "Core 2 " },
    ],
  };

  return (
    <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
      <FormControl size="small">
        <InputLabel id={ctrl.labelID}>{ctrl.label}</InputLabel>
        <Select
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          labelId={ctrl.labelID}
          id={ctrl.selectID}
          label={ctrl.label}
          value={core}
        >
          {ctrl.items.map((item, idx) => {
            return (
              <MenuItem key={idx} value={item.value}>
                {item.inner}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="warning"
        startIcon={<RefreshIcon />}
        onClick={handleClick}
      >
        Refresh
      </Button>
    </Stack>
  );
};

export default GraphForm;
