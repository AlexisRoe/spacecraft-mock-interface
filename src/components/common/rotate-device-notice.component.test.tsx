import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RotateDeviceNotice } from "./rotate-device-notice.component";

describe("RotateDeviceNotice", () => {
  it("renders a rotate instruction as an alert", () => {
    render(<RotateDeviceNotice />);
    expect(screen.getByRole("alert")).toHaveTextContent("Rotate device to landscape");
  });
});
