import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectDetails from ".";
import { useProjectContext } from "../../context/ProjectContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { fetchProjectDetails } from "../../api/productApi";
import { routes } from "../../utils/constants/routes";

const mockNavigate = jest.fn();
const mockUseParams = jest.fn().mockReturnValue({ id: "project_a" });
const mockUseLocation = jest
  .fn()
  .mockReturnValue({ pathname: "/projects/project_a" });
const mockShowSnackbar = jest.fn();
const mockHandleAddToFavourite = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockUseParams(),
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

jest.mock("../../context/ProjectContext", () => ({
  useProjectContext: jest.fn(),
}));
jest.mock("../../context/SnackbarContext", () => ({
  useSnackbar: jest.fn(),
}));

jest.mock("../../api/productApi", () => ({
  fetchProjectDetails: jest.fn(),
}));

describe("ProjectDetails Component", () => {
  const projectDetailsMock = {
    id: "project_a",
    projectName: "Project A",
    description: "Description A",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "Manager A",
    isFavourite: false,
  };

  beforeEach(() => {
    (useProjectContext as jest.Mock).mockReturnValue({
      projectList: [projectDetailsMock],
      handleAddToFavourite: mockHandleAddToFavourite,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });

    (fetchProjectDetails as jest.Mock).mockResolvedValue(projectDetailsMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render project details and fetch data by ID", async () => {
    render(
      <Router>
        <ProjectDetails />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Project A")).toBeInTheDocument();
      expect(screen.getByText("Description A")).toBeInTheDocument();
      expect(screen.getByText("2025-01-01")).toBeInTheDocument();
      expect(screen.getByText("2025-12-31")).toBeInTheDocument();
      expect(screen.getByText("Manager A")).toBeInTheDocument();
    });
  });

  it("should navigate to edit page when Edit button is clicked", async () => {
    render(
      <Router>
        <ProjectDetails />
      </Router>
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should add project to favourite when bookmark is clicked", async () => {
    render(
      <Router>
        <ProjectDetails />
      </Router>
    );

    const bookmarkIcon = screen.getByTestId("bookmark-icon");
    fireEvent.click(bookmarkIcon);

    expect(mockHandleAddToFavourite).toHaveBeenCalled();
  });

  it("should show error snackbar when project details fetching fails", async () => {
    (fetchProjectDetails as jest.Mock).mockRejectedValue(
      new Error("Fetch error")
    );

    render(
      <Router>
        <ProjectDetails />
      </Router>
    );

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Error fetching project details:",
        "error"
      );
    });
  });

  it("should navigate back to project list when Back button is clicked", () => {
    render(
      <Router>
        <ProjectDetails />
      </Router>
    );

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(routes.projectList);
  });
});
