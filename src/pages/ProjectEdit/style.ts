import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  "@media (max-width: 460px)": {
    "& .MuiTypography-root": {
      width: "100px",
    },
  },
});

const DescriptionBox = styled(Box)({
  "& textarea": {
    width: "450px",

    "@media (max-width: 700px)": {
      width: "50vw",
    },
  },
});

const Footer = styled(Box)({
  display: "flex",
  marginLeft: "165px",
  marginTop: "16px",

  "@media (max-width: 820px)": {
    marginLeft: "50px",
  },
});

export { Container, DescriptionBox, Footer };
