import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  position: "relative",

  "@media (max-width: 460px)": {
    "& .MuiTypography-root": {
      width: "100px",
    },
  },
});

const SvgWrapper = styled(Box)({
  position: "absolute",
  right: "38%",

  "@media (max-width: 820px)": {
    right: "10%",
  },
});

const Text = styled(Box)({
  width: "450px",

  "@media (max-width: 700px)": {
    width: "50vw",
  },
});

const Footer = styled(Box)({
  display: "flex",
  marginLeft: "165px",
  marginTop: "16px",
  gap: 24,

  "@media (max-width: 820px)": {
    marginLeft: "50px",
  },
});

export { Container, SvgWrapper, Text, Footer };
