import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatDisplay } from "./stat-display.component";

describe("StatDisplay", () => {
  it("renders the label and value", () => {
    render(<StatDisplay label="Ship Time" value="14:07:32" />);
    expect(screen.getByText("Ship Time")).toBeInTheDocument();
    expect(screen.getByText("14:07:32")).toBeInTheDocument();
  });
});
