import { styled, Box } from "@mui/material";

const InputWrapper = styled(Box)({
  display: "flex",
  gap: "16px",

  "& .MuiInputBase-input": {
    border: "2px solid",
    padding: "2px",
  },

  "& .MuiOutlinedInput-root": {
    padding: 0,
  },

  "@media (max-width: 460px)": {
    "& .MuiTypography-root": {
      width: "100px",
    },
  },
});

export { InputWrapper };
