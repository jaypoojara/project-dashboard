import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProjectDetails,
  updateProjectDetails,
} from "../../api/productApi";
import { useSnackbar } from "../../context/SnackbarContext";
import ProjectDetails from ".";
import { ProjectProvider } from "../../context/ProjectContext";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../../api/productApi", () => ({
  fetchProjectDetails: jest.fn(),
  updateProjectDetails: jest.fn(),
}));

jest.mock("../../context/SnackbarContext", () => ({
  useSnackbar: jest.fn(),
}));

describe("ProjectDetails", () => {
  const mockNavigate = jest.fn();
  const mockShowSnackbar = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });

    (fetchProjectDetails as jest.Mock).mockResolvedValue({
      id: "1",
      projectName: "Test Project",
      description: "Project Description",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      projectManager: "John Doe",
    });

    (updateProjectDetails as jest.Mock).mockResolvedValue({});

    render(
      <ProjectProvider>
        <ProjectDetails />
      </ProjectProvider>
    );
  });

  it("should render the component and display project details", async () => {
    expect(fetchProjectDetails).toHaveBeenCalledWith("1");
    expect(await screen.findByDisplayValue("Test Project")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("Project Description")
    ).toBeInTheDocument();
    expect(await screen.findByDisplayValue("John Doe")).toBeInTheDocument();
  });

  it("should update form values when inputs are changed", async () => {
    const projectNameInput: HTMLInputElement = await screen.findByTestId(
      "projectName"
    );
    fireEvent.change(projectNameInput, {
      target: { value: "Updated Project" },
    });
    expect(projectNameInput.value).toBe("Updated Project");
  });

  it("should show an error message if end date is earlier than start date", async () => {
    const startDateInput: HTMLInputElement = await screen.findByTestId(
      "startDate"
    );
    const endDateInput: HTMLInputElement = await screen.findByTestId("endDate");
    fireEvent.change(startDateInput, { target: { value: "2025-01-01" } });
    fireEvent.change(endDateInput, { target: { value: "2024-12-31" } });

    const updateButton = screen.getByRole("button", { name: /Update/i });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Please choose appropriate dates",
        "error"
      );
    });
  });

  it("should navigate to the project list after successful update", async () => {
    const updateButton = screen.getByRole("button", { name: /Update/i });

    const startDateInput: HTMLInputElement = await screen.findByTestId(
      "startDate"
    );
    const endDateInput: HTMLInputElement = await screen.findByTestId("endDate");

    fireEvent.change(startDateInput, { target: { value: "2025-01-01" } });
    fireEvent.change(endDateInput, { target: { value: "2025-12-31" } });

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Details updated successfully",
        "success"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/projects");
    });
  });

  it("should display an error message when API update fails", async () => {
    (updateProjectDetails as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to update")
    );

    const updateButton = screen.getByRole("button", { name: /Update/i });

    const startDateInput: HTMLInputElement = await screen.findByTestId(
      "startDate"
    );
    const endDateInput: HTMLInputElement = await screen.findByTestId("endDate");

    fireEvent.change(startDateInput, { target: { value: "2025-01-01" } });
    fireEvent.change(endDateInput, { target: { value: "2025-12-31" } });

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        "Error updating project:",
        new Error("Failed to update")
      );
    });
  });
});
