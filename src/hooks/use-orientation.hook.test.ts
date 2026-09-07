import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useOrientation } from "./use-orientation.hook";

function setViewport(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: height });
}

describe("useOrientation", () => {
  afterEach(() => {
    setViewport(1024, 768);
  });

  it("reports landscape when width exceeds height", () => {
    setViewport(1024, 768);
    const { result } = renderHook(() => useOrientation());
    expect(result.current.isPortrait).toBe(false);
  });

  it("reports portrait when height exceeds width", () => {
    setViewport(400, 800);
    const { result } = renderHook(() => useOrientation());
    expect(result.current.isPortrait).toBe(true);
  });

  it("updates on resize", () => {
    setViewport(1024, 768);
    const { result } = renderHook(() => useOrientation());

    act(() => {
      setViewport(400, 800);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.isPortrait).toBe(true);
  });
});
