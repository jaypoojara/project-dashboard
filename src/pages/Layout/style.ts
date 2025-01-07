import { Box, styled } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  width: "100%",

  "@media (max-width: 820px)": {
    flexDirection: "column",

    "& .MuiDivider-root": {
      height: "auto",
    },
  },
});

const Content = styled(Box)({
  width: "82vw",
  padding: "64px 24px 0",
  "@media (max-width: 820px)": {
    padding: "16px 16px 0",
    width: "100%",
  },
});

export { Container, Content };
