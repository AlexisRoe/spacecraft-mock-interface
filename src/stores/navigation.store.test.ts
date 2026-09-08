import { beforeEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "./navigation.store";

describe("useNavigationStore", () => {
  beforeEach(() => {
    useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
  });

  it("switches the active view", () => {
    useNavigationStore.getState().setActiveView(Views.Ops);
    expect(useNavigationStore.getState().activeView).toBe(Views.Ops);
  });

  it("resets the view state to view-state-a when the active view changes", () => {
    useNavigationStore.getState().setViewState("view-state-b");
    useNavigationStore.getState().setActiveView(Views.Propulsion);
    expect(useNavigationStore.getState().viewState).toBe("view-state-a");
  });

  it("sets the view state directly", () => {
    useNavigationStore.getState().setViewState("view-state-b");
    expect(useNavigationStore.getState().viewState).toBe("view-state-b");
  });

  it("toggles the view state", () => {
    useNavigationStore.getState().toggleViewState();
    expect(useNavigationStore.getState().viewState).toBe("view-state-b");

    useNavigationStore.getState().toggleViewState();
    expect(useNavigationStore.getState().viewState).toBe("view-state-a");
  });
});
