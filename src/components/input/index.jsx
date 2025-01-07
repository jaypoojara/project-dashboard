import { TextField, Typography } from "@mui/material";
import React from "react";
import { InputWrapper } from "./style";

const CustomInput = ({ name, label, value, handleChange, ...props }) => {
  return (
    <InputWrapper>
      <Typography width={150} textAlign={"end"}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        size="small"
        {...props}
      />
    </InputWrapper>
  );
};

export default CustomInput;
