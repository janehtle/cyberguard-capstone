import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "../Homepage";

// Mock the useNavigate function
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Homepage Component", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  test("renders main heading", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Find the h1 with CyberGuard text
    const heading = screen.getByRole("heading", { level: 1, name: /CyberGuard/i });
    expect(heading).toBeInTheDocument();
  });

  test("renders Get Started button", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  test("clicking Get Started triggers navigation", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/quizhome");
  });
});
