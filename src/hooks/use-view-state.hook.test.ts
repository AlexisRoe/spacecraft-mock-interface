import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useNavigationStore, Views } from "../stores/navigation.store";
import { useViewState } from "./use-view-state.hook";

describe("useViewState", () => {
  beforeEach(() => {
    useNavigationStore.setState({ activeView: Views.Navigation, viewState: "view-state-a" });
  });

  it("reports view-state-a as active by default with the view's labels", () => {
    const { result } = renderHook(() => useViewState());

    expect(result.current.isStateA).toBe(true);
    expect(result.current.isStateB).toBe(false);
    expect(result.current.labelA).toBe("Automatic");
    expect(result.current.labelB).toBe("Manual");
  });

  it("uses the labels of the currently active view", () => {
    act(() => {
      useNavigationStore.getState().setActiveView(Views.Ops);
    });

    const { result } = renderHook(() => useViewState());
    expect(result.current.labelA).toBe("Weapons");
    expect(result.current.labelB).toBe("Defence");
  });

  it("selects view-state-b", () => {
    const { result } = renderHook(() => useViewState());

    act(() => {
      result.current.selectStateB();
    });

    expect(useNavigationStore.getState().viewState).toBe("view-state-b");
  });
});
