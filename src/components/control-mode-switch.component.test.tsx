import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "../stores/spacecraft.store";
import { ControlModeSwitch } from "./control-mode-switch.component";

describe("ControlModeSwitch", () => {
  beforeEach(() => {
    useSpacecraftStore.setState({ controlMode: "autopilot" });
  });

  it("marks only the active mode as pressed", () => {
    render(
      <ControlModeSwitch
        groupLabel="Control"
        options={[
          { mode: "autopilot", label: "Autopilot" },
          { mode: "manual", label: "Manual" },
        ]}
      />,
    );

    expect(screen.getByRole("button", { name: "Autopilot" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Manual" })).toHaveAttribute("aria-pressed", "false");
  });

  it("switches the active control mode in the store on select", () => {
    render(
      <ControlModeSwitch
        groupLabel="Control"
        options={[
          { mode: "autopilot", label: "Autopilot" },
          { mode: "manual", label: "Manual" },
        ]}
      />,
    );

    screen.getByRole("button", { name: "Manual" }).click();
    expect(useSpacecraftStore.getState().controlMode).toBe("manual");
  });
});
