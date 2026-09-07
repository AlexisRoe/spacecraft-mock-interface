import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogsView } from "./logs.view";

describe("LogsView", () => {
  it("renders the logs view title", () => {
    render(<LogsView />);
    expect(screen.getByText("Logs View")).toBeInTheDocument();
  });
});
