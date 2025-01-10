import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectCreate from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { useProjectContext } from "../../context/ProjectContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { createProject } from "../../api/productApi";
import { routes } from "../../utils/constants/routes";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../context/ProjectContext", () => ({
  useProjectContext: jest.fn(),
}));

jest.mock("../../context/SnackbarContext", () => ({
  useSnackbar: jest.fn(),
}));

jest.mock("../../api/productApi", () => ({
  createProject: jest.fn(),
}));

describe("ProjectCreate Component", () => {
  const mockFetchProjects = jest.fn();
  const mockShowSnackbar = jest.fn();

  beforeEach(() => {
    (useProjectContext as jest.Mock).mockReturnValue({
      fetchProjects: mockFetchProjects,
    });

    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all form fields", () => {
    render(
      <Router>
        <ProjectCreate />
      </Router>
    );

    expect(screen.getByText("Project ID")).toBeInTheDocument();
    expect(screen.getByText("Project Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Project Manager")).toBeInTheDocument();
  });

  it("should show an error if required fields are not filled", async () => {
    render(
      <Router>
        <ProjectCreate />
      </Router>
    );

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText("Project ID is required")).toBeInTheDocument();
      expect(screen.getByText("Project Name is required")).toBeInTheDocument();
      expect(screen.getByText("Start Date is required")).toBeInTheDocument();
      expect(screen.getByText("End Date is required")).toBeInTheDocument();
      expect(
        screen.getByText("Project Manager is required")
      ).toBeInTheDocument();
    });

    expect(mockShowSnackbar).toHaveBeenCalledWith(
      "Please fill in all required fields",
      "error"
    );
  });

  it("should show an error if end date is earlier than start date", async () => {
    render(
      <Router>
        <ProjectCreate />
      </Router>
    );

    fireEvent.change(screen.getByTestId("id"), {
      target: { value: "project_a" },
    });
    fireEvent.change(screen.getByTestId("projectName"), {
      target: { value: "Project A" },
    });
    fireEvent.change(screen.getByTestId("description"), {
      target: { value: "Description A" },
    });
    fireEvent.change(screen.getByTestId("projectManager"), {
      target: { value: "Manager A" },
    });

    fireEvent.change(screen.getByTestId("startDate"), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByTestId("endDate"), {
      target: { value: "2024-12-31" },
    });
    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Please choose appropriate dates",
        "error"
      );
    });
  });

  it("should create a new project successfully and navigate to project list", async () => {
    (createProject as jest.Mock).mockResolvedValue({});

    render(
      <Router>
        <ProjectCreate />
      </Router>
    );

    fireEvent.change(screen.getByTestId("id"), {
      target: { value: "project_a" },
    });
    fireEvent.change(screen.getByTestId("projectName"), {
      target: { value: "Project A" },
    });
    fireEvent.change(screen.getByTestId("description"), {
      target: { value: "Description A" },
    });
    fireEvent.change(screen.getByTestId("projectManager"), {
      target: { value: "Manager A" },
    });

    fireEvent.change(screen.getByTestId("startDate"), {
      target: { value: "2025-01-01" },
    });
    fireEvent.change(screen.getByTestId("endDate"), {
      target: { value: "2025-01-31" },
    });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(createProject).toHaveBeenCalledWith({
        id: "project_a",
        projectName: "Project A",
        description: "Description A",
        startDate: "2025-01-01",
        endDate: "2025-01-31",
        projectManager: "Manager A",
        isFavourite: false,
      });
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Project created successfully",
        "success"
      );
      expect(mockFetchProjects).toHaveBeenCalled();
    });

    expect(mockNavigate).toHaveBeenCalledWith(routes.projectList);
  });

  it("should show error snackbar if project creation fails", async () => {
    (createProject as jest.Mock).mockRejectedValue(
      new Error("Error creating project")
    );

    render(
      <Router>
        <ProjectCreate />
      </Router>
    );

    fireEvent.change(screen.getByTestId("id"), {
      target: { value: "project_a" },
    });
    fireEvent.change(screen.getByTestId("projectName"), {
      target: { value: "Project A" },
    });
    fireEvent.change(screen.getByTestId("description"), {
      target: { value: "Description A" },
    });
    fireEvent.change(screen.getByTestId("projectManager"), {
      target: { value: "Manager A" },
    });

    fireEvent.change(screen.getByTestId("startDate"), {
      target: { value: "2024-12-31" },
    });
    fireEvent.change(screen.getByTestId("endDate"), {
      target: { value: "2025-01-01" },
    });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Error creating project",
        "error"
      );
    });
  });
});
