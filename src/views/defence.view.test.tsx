import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DefenceView } from "./defence.view";

describe("DefenceView", () => {
  it("renders the defence view title", () => {
    render(<DefenceView />);
    expect(screen.getByText("Defence View")).toBeInTheDocument();
  });
});
