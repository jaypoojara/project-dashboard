import { render, screen, fireEvent } from "@testing-library/react";
import ProjectList from ".";
import { BrowserRouter as Router } from "react-router-dom";

import { useProjectContext } from "../../context/ProjectContext";
const mockNavigate = jest.fn();
const mockHandleAddToFavourite = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../context/ProjectContext", () => ({
  useProjectContext: jest.fn(),
}));

describe("ProjectList Component", () => {
  const projectList = [
    { id: "project_a", projectName: "Project A" },
    { id: "2", projectName: "Project B" },
  ];

  beforeEach(() => {
    (useProjectContext as jest.Mock).mockReturnValue({
      projectList,
      handleAddToFavourite: mockHandleAddToFavourite,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the CustomTable with project data", () => {
    render(<ProjectList />);

    expect(screen.getByText("Project A")).toBeInTheDocument();
  });

  it("should call handleEdit and navigate to the correct project edit page", () => {
    render(
      <Router>
        <ProjectList />
      </Router>
    );
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/projects/project_a/edit");
  });

  it("should call handleEdit and navigate to the correct project details page", () => {
    render(
      <Router>
        <ProjectList />
      </Router>
    );
    fireEvent.click(screen.getAllByText("project_a")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/projects/project_a");
  });

  it("should add project to favourite when bookmark is clicked", async () => {
    render(
      <Router>
        <ProjectList />
      </Router>
    );

    const bookmarkIcon = screen.getByTestId("bookmark-icon-2");
    fireEvent.click(bookmarkIcon);

    expect(mockHandleAddToFavourite).toHaveBeenCalled();
  });
});
