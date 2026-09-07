import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FieldsFtlView } from "./fields-ftl.view";

describe("FieldsFtlView", () => {
  it("renders the fields & FTL view title", () => {
    render(<FieldsFtlView />);
    expect(screen.getByText("Fields & FTL View")).toBeInTheDocument();
  });
});
