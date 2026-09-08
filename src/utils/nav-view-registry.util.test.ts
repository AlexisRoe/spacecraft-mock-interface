import { describe, expect, it } from "vitest";
import { Views } from "../stores/navigation.store";
import { NAV_VIEW_COMPONENTS } from "./nav-view-registry.util";

describe("NAV_VIEW_COMPONENTS", () => {
  it("has an entry for every nav view", () => {
    for (const view of Object.values(Views)) {
      expect(NAV_VIEW_COMPONENTS[view]).toBeDefined();
    }
  });
});
