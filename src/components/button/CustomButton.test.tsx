import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from ".";

jest.mock("./style", () => ({
  ButtonWrapper: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  ),
}));

describe("CustomButton Component", () => {
  const mockOnClick = jest.fn();

  it("should render the button with the correct label", () => {
    render(<CustomButton label="Click Me" onClick={mockOnClick} />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    render(<CustomButton label="Click Me" onClick={mockOnClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should pass the variant prop to the button", () => {
    render(
      <CustomButton label="Click Me" variant="outlined" onClick={mockOnClick} />
    );

    const button = screen.getByText("Click Me");

    expect(button).toHaveAttribute("variant", "outlined");
  });

  it("should pass any additional props to the button", () => {
    render(
      <CustomButton
        label="Click Me"
        onClick={mockOnClick}
        data-testid="custom-button"
      />
    );

    const button = screen.getByTestId("custom-button");

    expect(button).toBeInTheDocument();
  });
});
