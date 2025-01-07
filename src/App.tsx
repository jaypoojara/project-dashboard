import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
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
            <Route path={"/project-list"} element={<ProjectList />} />
            <Route path={`/project-details/:id`} element={<ProjectDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
