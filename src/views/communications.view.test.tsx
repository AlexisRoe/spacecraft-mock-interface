import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CommunicationsView } from "./communications.view";

describe("CommunicationsView", () => {
  it("renders the communications view title", () => {
    render(<CommunicationsView />);
    expect(screen.getByText("Communications View")).toBeInTheDocument();
  });
});
