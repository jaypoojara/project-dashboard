import { render, screen } from "@testing-library/react";
import { useProjectContext } from "../../context/ProjectContext";
import Sidebar from ".";

jest.mock("../../context/ProjectContext");

describe("Sidebar Component", () => {
  it("should render Sidebar with Favourite Projects heading", () => {
    (useProjectContext as jest.Mock).mockReturnValue({
      projectList: [],
    });

    render(<Sidebar />);

    expect(screen.getByText("Favourite Projects")).toBeInTheDocument();
  });

  it("should render a list of favourite projects when available", () => {
    const projectList = [
      { id: 1, projectName: "Project A", isFavourite: true },
      { id: 2, projectName: "Project B", isFavourite: true },
    ];
    (useProjectContext as jest.Mock).mockReturnValue({ projectList });

    render(<Sidebar />);

    expect(screen.getByText("Favourite Projects")).toBeInTheDocument();
    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project B")).toBeInTheDocument();
  });

  it("should not render any list items if no favourite projects", () => {
    const projectList = [
      { id: 1, projectName: "Project A", isFavourite: false },
      { id: 2, projectName: "Project B", isFavourite: false },
    ];
    (useProjectContext as jest.Mock).mockReturnValue({ projectList });

    render(<Sidebar />);

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });
});
