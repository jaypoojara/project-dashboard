import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import { routes } from "./utils/routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route path={routes.projectList} element={<ProjectList />} />
            <Route
              path={`${routes.projectDetails}/:id`}
              element={<ProjectDetails />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
