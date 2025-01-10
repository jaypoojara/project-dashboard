import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import { routes } from "./utils/constants/routes";
import ProjectEdit from "./pages/ProjectEdit";
import ProjectCreate from "./pages/ProjectCreate";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route path={routes.projectList} element={<ProjectList />} />
            <Route path={routes.projectCreate} element={<ProjectCreate />} />
            <Route
              path={`${routes.projectDetails}/:projectId`}
              element={<ProjectDetails />}
            />
            <Route
              path={`${routes.projectDetails}/:projectId/edit`}
              element={<ProjectEdit />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
