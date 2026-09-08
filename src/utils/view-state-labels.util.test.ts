import { describe, expect, it } from "vitest";
import { Views } from "../stores/navigation.store";
import { VIEW_STATE_LABELS } from "./view-state-labels.util";

describe("VIEW_STATE_LABELS", () => {
  it("has a label pair for every view", () => {
    for (const view of Object.values(Views)) {
      expect(VIEW_STATE_LABELS[view]).toBeDefined();
      expect(VIEW_STATE_LABELS[view].stateA).toBeTruthy();
      expect(VIEW_STATE_LABELS[view].stateB).toBeTruthy();
    }
  });
});
