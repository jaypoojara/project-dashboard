import { useEffect } from "react";
import { Divider } from "@mui/material";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Sidebar from "../../components/sidebar";
import { SnackbarProvider } from "../../context/SnackbarContext";
import { Container, Content } from "./style";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate(routes.projectList);
  }, [location]);

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
