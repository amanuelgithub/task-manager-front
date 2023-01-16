import React from "react";
import { Typography } from "@mui/material";

function Title({ title }: { title: string }) {
  return (
    <Typography variant="h6" sx={{ textAlign: "center" }}>
      {title}
    </Typography>
  );
}

export default Title;
