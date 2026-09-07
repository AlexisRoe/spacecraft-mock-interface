import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavigationView } from "./navigation.view";

describe("NavigationView", () => {
  it("renders the navigation view title", () => {
    render(<NavigationView />);
    expect(screen.getByText("Navigation View")).toBeInTheDocument();
  });
});
