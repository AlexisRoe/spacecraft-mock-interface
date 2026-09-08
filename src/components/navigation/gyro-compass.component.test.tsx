import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GyroCompass } from "./gyro-compass.component";

describe("GyroCompass", () => {
  it("renders the caption and compass dial", () => {
    render(<GyroCompass angleDeg={45} caption="BEARING / ELEVATION · GYRO A LOCKED" />);
    expect(screen.getByText("BEARING / ELEVATION · GYRO A LOCKED")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Attitude gyro compass" })).toBeInTheDocument();
  });
});
