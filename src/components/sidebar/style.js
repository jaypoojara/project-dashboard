import { styled } from "@mui/material";

const Wrapper = styled("div")({
  paddingTop: "64px",
  width: "18vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media (max-width: 820px)": {
    width: "100%",
    padding: "16px 16px 0",
    alignItems: "start",

    "& li": {
      width: "auto",
    },

    "& .MuiList-root": {
      display: "flex",
      gap: "16px",
      flexDirection: "row",
    },
  },
});

export { Wrapper };
