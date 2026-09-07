import { beforeEach, describe, expect, it } from "vitest";
import { useSpacecraftStore } from "./spacecraft.store";

describe("useSpacecraftStore", () => {
  beforeEach(() => {
    useSpacecraftStore.setState({
      shipName: "USS Placeholder",
      controlMode: "autopilot",
      status: "nominal",
      hullIntegrity: 100,
    });
  });

  it("updates the status", () => {
    useSpacecraftStore.getState().setStatus("critical");
    expect(useSpacecraftStore.getState().status).toBe("critical");
  });

  it("clamps hull integrity to the 0-100 range", () => {
    useSpacecraftStore.getState().setHullIntegrity(150);
    expect(useSpacecraftStore.getState().hullIntegrity).toBe(100);

    useSpacecraftStore.getState().setHullIntegrity(-20);
    expect(useSpacecraftStore.getState().hullIntegrity).toBe(0);
  });

  it("updates the control mode", () => {
    useSpacecraftStore.getState().setControlMode("manual");
    expect(useSpacecraftStore.getState().controlMode).toBe("manual");
  });
});
