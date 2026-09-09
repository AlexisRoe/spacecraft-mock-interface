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

  it("clamps a system's value to the 0-100 range", () => {
    useShipSystemsStore.getState().setSystemValue("reactor", 150);
    expect(useShipSystemsStore.getState().systems.find((s) => s.id === "reactor")?.value).toBe(100);

    useShipSystemsStore.getState().setSystemValue("reactor", -20);
    expect(useShipSystemsStore.getState().systems.find((s) => s.id === "reactor")?.value).toBe(0);
  });

  it("leaves other systems' values unchanged", () => {
    useShipSystemsStore.getState().setSystemValue("reactor", 50);
    const bridge = useShipSystemsStore.getState().systems.find((s) => s.id === "bridge");
    expect(bridge?.value).toBe(100);
  });
});
