import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar";
import { Divider } from "@mui/material";
import { Container, Content } from "./style";

import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import { SnackbarProvider } from "../../context/SnackbarContext";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.projectList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SnackbarProvider>
      <Container>
        <Sidebar />
        <Divider
          orientation="vertical"
          sx={{ height: "100vh", borderWidth: "1px" }}
        />
        <Content>
          <Outlet />
        </Content>
      </Container>
    </SnackbarProvider>
  );
};

export default Layout;
