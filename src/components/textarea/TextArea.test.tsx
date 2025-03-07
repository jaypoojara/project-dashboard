import { render, screen } from "@testing-library/react";
import TextArea from ".";

describe("TextArea component", () => {
  test("renders label correctly", () => {
    const label = "Description";

    render(<TextArea label={label} />);

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test("passes all props to the textarea", () => {
    const label = "Description";
    const mockProps = {
      name: "description",
      value: "Test description",
      placeholder: "Enter description here",
      rows: 4,
    };

    render(<TextArea label={label} {...mockProps} />);

    const textareaElement = screen.getByPlaceholderText(
      "Enter description here"
    ) as HTMLTextAreaElement;

    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement.value).toBe("Test description");
    expect(textareaElement.getAttribute("name")).toBe("description");
    expect(textareaElement.getAttribute("rows")).toBe("4");
  });

  test("renders the TextareaAutosize component with custom styles", () => {
    render(<TextArea label="Custom Label" />);

    const textareaElement = screen.getByRole("textbox");

    expect(textareaElement).toHaveStyle({ padding: "8px" });
  });
});
