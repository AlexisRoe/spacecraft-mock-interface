import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MasterCaution } from "./master-caution.component";

describe("MasterCaution", () => {
  it("renders the clear status and summary", () => {
    render(<MasterCaution summary="No advisories." lastAcknowledgement="09:14:02" />);

    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText(/No advisories\. Last acknowledgement 09:14:02\./)).toBeInTheDocument();
  });
});
