import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScienceView } from "./science.view";

describe("ScienceView", () => {
  it("renders the science view title", () => {
    render(<ScienceView />);
    expect(screen.getByText("Science View")).toBeInTheDocument();
  });
});
