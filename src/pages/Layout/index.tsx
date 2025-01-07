import { useEffect } from "react";
import { Divider } from "@mui/material";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants/routes";
import Sidebar from "../../components/sidebar";
import { SnackbarProvider } from "../../context/SnackbarContext";
import { Container, Content } from "./style";
import { ProjectProvider } from "../../context/ProjectContext";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate(routes.projectList);
  }, [location]);

  return (
    <SnackbarProvider>
      <ProjectProvider>
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
      </ProjectProvider>
    </SnackbarProvider>
  );
};

export default Layout;
