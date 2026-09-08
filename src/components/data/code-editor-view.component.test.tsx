import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useCodeConsoleStore } from "../../stores/code-console.store";
import { CODE_GLYPHS } from "../../utils/code-glyphs.util";
import { CodeEditorView } from "./code-editor-view.component";

describe("CodeEditorView", () => {
  afterEach(() => {
    act(() => {
      useCodeConsoleStore.setState({ program: [] });
    });
  });

  it("renders a single empty line number for an empty program", () => {
    render(<CodeEditorView />);
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.queryByText("002")).not.toBeInTheDocument();
  });

  it("renders one glyph icon per token on a line", () => {
    act(() => {
      useCodeConsoleStore.setState({ program: [CODE_GLYPHS[0].code, CODE_GLYPHS[1].code] });
    });
    const { container } = render(<CodeEditorView />);
    expect(container.querySelectorAll(".code-glyph-icon")).toHaveLength(2);
  });

  it("starts a new numbered line on a line break", () => {
    act(() => {
      useCodeConsoleStore.setState({ program: [CODE_GLYPHS[0].code, "LF", CODE_GLYPHS[1].code] });
    });
    render(<CodeEditorView />);
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText("002")).toBeInTheDocument();
  });
});
