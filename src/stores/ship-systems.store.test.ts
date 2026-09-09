import { beforeEach, describe, expect, it } from "vitest";
import { useShipSystemsStore } from "./ship-systems.store";

describe("useShipSystemsStore", () => {
  beforeEach(() => {
    useShipSystemsStore.setState({ selectedSystem: null });
  });

  it("selects a system", () => {
    useShipSystemsStore.getState().toggleSystem("reactor");
    expect(useShipSystemsStore.getState().selectedSystem).toBe("reactor");
  });

  it("deselects a system when toggled again", () => {
    useShipSystemsStore.getState().toggleSystem("reactor");
    useShipSystemsStore.getState().toggleSystem("reactor");
    expect(useShipSystemsStore.getState().selectedSystem).toBeNull();
  });

  it("switches selection to a newly toggled system", () => {
    useShipSystemsStore.getState().toggleSystem("reactor");
    useShipSystemsStore.getState().toggleSystem("shield");
    expect(useShipSystemsStore.getState().selectedSystem).toBe("shield");
  });

  it("updates a system's value", () => {
    useShipSystemsStore.getState().setSystemValue("reactor", "389 MW");
    expect(useShipSystemsStore.getState().systems.find((s) => s.id === "reactor")?.value).toBe(
      "389 MW",
    );
  });

  it("leaves other systems' values unchanged", () => {
    useShipSystemsStore.getState().setSystemValue("reactor", "389 MW");
    const bridge = useShipSystemsStore.getState().systems.find((s) => s.id === "bridge");
    expect(bridge?.value).toBe("NOMINAL");
  });
});
