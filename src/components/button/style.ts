import { Button, styled } from "@mui/material";

const ButtonWrapper = styled(Button)<{ loading?: boolean }>(({ loading }) => ({
  fontSize: "12px",
  padding: "4px 16px !important",
  boxShadow: "none",
  minWidth: "none",

  "& .MuiCircularProgress-root": {
    color: loading ? "white" : "inherit",
  },
}));

export { ButtonWrapper };
