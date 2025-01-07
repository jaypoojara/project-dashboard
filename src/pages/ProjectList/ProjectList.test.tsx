import { render, screen, fireEvent } from "@testing-library/react";
import ProjectList from ".";
import { BrowserRouter as Router } from "react-router-dom";

import { useProjectContext } from "../../context/ProjectContext";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../context/ProjectContext", () => ({
  useProjectContext: jest.fn(),
}));

describe("ProjectList Component", () => {
  const projectList = [
    { id: "1", projectName: "Project A" },
    { id: "2", projectName: "Project B" },
  ];

  beforeEach(() => {
    (useProjectContext as jest.Mock).mockReturnValue({ projectList });
  });

  it("should render the CustomTable with project data", () => {
    render(<ProjectList />);

    expect(screen.getByText("Project A")).toBeInTheDocument();
  });

  it("should call handleEdit and navigate to the correct project details page", () => {
    render(
      <Router>
        <ProjectList />
      </Router>
    );
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/project-details/1");
  });
});
