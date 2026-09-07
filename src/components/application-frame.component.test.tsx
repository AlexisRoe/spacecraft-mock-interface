import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ApplicationFrame } from "./application-frame.component";

describe("ApplicationFrame", () => {
  it("renders header, content, and footer children in their respective areas", () => {
    render(
      <ApplicationFrame>
        <ApplicationFrame.Header>Header</ApplicationFrame.Header>
        <ApplicationFrame.Content>Content</ApplicationFrame.Content>
        <ApplicationFrame.Footer>Footer</ApplicationFrame.Footer>
      </ApplicationFrame>,
    );

    expect(screen.getByText("Header").closest("header")).toHaveClass("application-frame__header");
    expect(screen.getByText("Content").closest("main")).toHaveClass("application-frame__content");
    expect(screen.getByText("Footer").closest("footer")).toHaveClass("application-frame__footer");
  });

  it("renders nav and article children in their respective areas", () => {
    render(
      <ApplicationFrame.Content>
        <ApplicationFrame.Nav>Nav</ApplicationFrame.Nav>
        <ApplicationFrame.Article>Article</ApplicationFrame.Article>
      </ApplicationFrame.Content>,
    );

    expect(screen.getByText("Nav").closest("nav")).toHaveClass("application-frame__nav");
    expect(screen.getByText("Article").closest("article")).toHaveClass(
      "application-frame__article",
    );
  });
});
