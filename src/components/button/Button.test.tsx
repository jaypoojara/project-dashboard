import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

jest.mock("./style", () => ({
  ButtonWrapper: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  ),
}));

describe("Button Component", () => {
  const mockOnClick = jest.fn();

  it("should render the button with the correct label", () => {
    render(<Button label="Click Me" onClick={mockOnClick} />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    render(<Button label="Click Me" onClick={mockOnClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should pass the variant prop to the button", () => {
    render(
      <Button label="Click Me" variant="outlined" onClick={mockOnClick} />
    );

    const button = screen.getByText("Click Me");

    expect(button).toHaveAttribute("variant", "outlined");
  });

  it("should pass any additional props to the button", () => {
    render(
      <Button
        label="Click Me"
        onClick={mockOnClick}
        data-testid="custom-button"
      />
    );

    const button = screen.getByTestId("custom-button");

    expect(button).toBeInTheDocument();
  });
});
