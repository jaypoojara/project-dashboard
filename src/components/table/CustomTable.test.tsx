import { render, screen, fireEvent } from "@testing-library/react";
import { Project } from "../../api/type";
import CustomTable from ".";

describe("CustomTable", () => {
  const mockHandleEdit = jest.fn();

  const columns = [
    { label: "Project Name", id: "projectName" },
    { label: "Start Date", id: "startDate" },
    { label: "End Date", id: "endDate" },
    { label: "Project Manager", id: "projectManager" },
    { label: "Is Favourite", id: "isFavourite" },
  ];

  const rows: Project[] = [
    {
      id: "1",
      projectName: "Project A",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      projectManager: "John Doe",
      isFavourite: true,
    },
    {
      id: "2",
      projectName: "Project B",
      startDate: "2023-02-01",
      endDate: "2023-10-15",
      projectManager: "Jane Smith",
      isFavourite: false,
    },
  ];

  it("renders the table with correct headers", () => {
    render(
      <CustomTable rows={rows} columns={columns} handleEdit={mockHandleEdit} />
    );

    columns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it("renders the table rows with correct data", () => {
    render(
      <CustomTable rows={rows} columns={columns} handleEdit={mockHandleEdit} />
    );

    rows.forEach((row) => {
      expect(screen.getByText(row.projectName)).toBeInTheDocument();
      expect(screen.getByText(row.startDate)).toBeInTheDocument();
      expect(screen.getByText(row.endDate)).toBeInTheDocument();
      expect(screen.getByText(row.projectManager)).toBeInTheDocument();
    });
  });

  it("calls handleEdit when 'Edit' button is clicked", () => {
    render(
      <CustomTable rows={rows} columns={columns} handleEdit={mockHandleEdit} />
    );

    const editButtons = screen.getAllByText("Edit");

    fireEvent.click(editButtons[0]);

    expect(mockHandleEdit).toHaveBeenCalledWith("1");
  });

  it("does not render action button in the table body", () => {
    render(
      <CustomTable rows={rows} columns={columns} handleEdit={mockHandleEdit} />
    );

    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBe(rows.length);
  });
});