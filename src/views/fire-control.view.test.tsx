import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FireControlView } from "./fire-control.view";

describe("FireControlView", () => {
  it("renders the fire control view title", () => {
    render(<FireControlView />);
    expect(screen.getByText("Fire Control View")).toBeInTheDocument();
  });
});
