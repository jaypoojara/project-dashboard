import { render, screen, fireEvent } from "@testing-library/react";
import CustomInput from ".";

jest.mock("./style", () => ({
  InputWrapper: ({ children }) => <div>{children}</div>,
}));

describe("CustomInput Component", () => {
  const mockOnChange = jest.fn();

  it("should render label and input field", () => {
    render(
      <CustomInput
        label="Username"
        name="username"
        value=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    const input = screen.getByTestId("username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "username");
  });

  it("should call onChange when input value changes", () => {
    const mockOnChange = jest.fn();
    render(
      <CustomInput label="Username" name="username" onChange={mockOnChange} />
    );

    const input = screen.getByTestId("username");
    fireEvent.change(input, { target: { value: "new username" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const event = mockOnChange.mock.calls[0][0]; // Get the event from mock call
    expect(event.target.value).toBe("new username");

    expect((input as HTMLInputElement).value).toBe("new username");
  });
  it("should pass value prop correctly to the input field", () => {
    render(
      <CustomInput
        label="Username"
        name="username"
        value="john_doe"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByTestId("username");
    expect(input).toHaveValue("john_doe");
  });

  it("should pass any additional props to the TextField component", () => {
    render(
      <CustomInput
        label="Username"
        name="username"
        value="john_doe"
        onChange={mockOnChange}
        placeholder="Enter your username"
      />
    );

    const input = screen.getByTestId("username");
    expect(input).toHaveAttribute("placeholder", "Enter your username");
  });
});
