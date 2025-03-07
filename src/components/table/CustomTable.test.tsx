import { render, screen, fireEvent } from "@testing-library/react";
import { Project } from "../../api/type";
import CustomTable from ".";
import { projectListColumns } from "../../pages/ProjectList/constant";

describe("CustomTable", () => {
  const mockHandleEdit = jest.fn();
  const mockHandleAddToFavourite = jest.fn();

  const rows: Project[] = [
    {
      id: "1",
      projectName: "Project A",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      projectManager: "John Doe",
      isFavourite: true,
      description: "",
    },
    {
      id: "2",
      projectName: "Project B",
      startDate: "2023-02-01",
      endDate: "2023-10-15",
      projectManager: "Jane Smith",
      isFavourite: true,
      description: "",
    },
  ];

  it("renders the table with correct headers", () => {
    render(
      <CustomTable
        rows={rows}
        columns={projectListColumns}
        handleEdit={mockHandleEdit}
        handleAddToFavourite={mockHandleAddToFavourite}
      />
    );

    projectListColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it("renders the table rows with correct data", () => {
    render(
      <CustomTable
        rows={rows}
        columns={projectListColumns}
        handleEdit={mockHandleEdit}
        handleAddToFavourite={mockHandleAddToFavourite}
      />
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
      <CustomTable
        rows={rows}
        columns={projectListColumns}
        handleEdit={mockHandleEdit}
        handleAddToFavourite={mockHandleAddToFavourite}
      />
    );

    const editButtons = screen.getAllByText("Edit");

    fireEvent.click(editButtons[0]);

    expect(mockHandleEdit).toHaveBeenCalledWith("1", "edit");
  });

  it("calls handleAddToFavourite when 'Bookmark Icon'  is clicked", () => {
    render(
      <CustomTable
        rows={rows}
        columns={projectListColumns}
        handleEdit={mockHandleEdit}
        handleAddToFavourite={mockHandleAddToFavourite}
      />
    );

    const editButtons = screen.getAllByTestId("bookmark-icon-1");

    fireEvent.click(editButtons[0]);

    expect(mockHandleAddToFavourite).toHaveBeenCalled();
  });

  it("does not render action button in the table body", () => {
    render(
      <CustomTable
        rows={rows}
        columns={projectListColumns}
        handleEdit={mockHandleEdit}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBe(rows.length);
  });
});
