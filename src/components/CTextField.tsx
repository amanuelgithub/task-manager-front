import React from "react";
import TextField from "@mui/material/TextField";

function CTextField({
  name,
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  name?: string;
  value?: string;
  onChange?: (event: any) => void;
  label: string;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <TextField
      type="text"
      name={name}
      margin="normal"
      fullWidth
      label={label}
      variant="outlined"
      size="small"
      multiline={multiline}
      rows={multiline ? 3 : 1}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default CTextField;
