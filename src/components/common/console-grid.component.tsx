import type { JSX, ReactNode } from "react";

import "./console-grid.component.css";

/** Props for {@link ConsoleGrid.Header}. */
export interface ConsoleGridHeaderProps {
  /** Content rendered inside the header area. */
  children?: ReactNode;
}

/** Header area of a {@link ConsoleGrid} layout, spanning the full width. */
function Header({ children }: ConsoleGridHeaderProps): JSX.Element {
  return <div className="console-grid__header">{children}</div>;
}

/** Props for {@link ConsoleGrid.Left}. */
export interface ConsoleGridLeftProps {
  /** Content rendered inside the left column. */
  children?: ReactNode;
}

/** Left column of a {@link ConsoleGrid} `"split"` layout. */
function Left({ children }: ConsoleGridLeftProps): JSX.Element {
  return <div className="console-grid__left">{children}</div>;
}

/** Props for {@link ConsoleGrid.Right}. */
export interface ConsoleGridRightProps {
  /** Content rendered inside the right column. */
  children?: ReactNode;
}

/** Right column of a {@link ConsoleGrid} `"split"` layout. */
function Right({ children }: ConsoleGridRightProps): JSX.Element {
  return <div className="console-grid__right">{children}</div>;
}

/** Props for {@link ConsoleGrid.Content}. */
export interface ConsoleGridContentProps {
  /** Content rendered inside the full-width content area. */
  children?: ReactNode;
}

/** Full-width content area of a {@link ConsoleGrid} `"full"` layout. */
function Content({ children }: ConsoleGridContentProps): JSX.Element {
  return <div className="console-grid__content">{children}</div>;
}

/** Props for {@link ConsoleGrid.Primary}. */
export interface ConsoleGridPrimaryProps {
  /** Content rendered inside the flexible first column. */
  children?: ReactNode;
}

/** First (`1fr`) column of a {@link ConsoleGrid} `"manual"` layout. */
function Primary({ children }: ConsoleGridPrimaryProps): JSX.Element {
  return <div className="console-grid__primary">{children}</div>;
}

/** Props for {@link ConsoleGrid.Secondary}. */
export interface ConsoleGridSecondaryProps {
  /** Content rendered inside the second (`auto`) column. */
  children?: ReactNode;
}

/** Second (`auto`) column of a {@link ConsoleGrid} `"manual"` layout. */
function Secondary({ children }: ConsoleGridSecondaryProps): JSX.Element {
  return <div className="console-grid__secondary">{children}</div>;
}

/** Props for {@link ConsoleGrid.Tertiary}. */
export interface ConsoleGridTertiaryProps {
  /** Content rendered inside the third (`auto`) column. */
  children?: ReactNode;
}

/** Third (`auto`) column of a {@link ConsoleGrid} `"manual"` layout. */
function Tertiary({ children }: ConsoleGridTertiaryProps): JSX.Element {
  return <div className="console-grid__tertiary">{children}</div>;
}

/** Props for {@link ConsoleGrid.Footer}. */
export interface ConsoleGridFooterProps {
  /** Content rendered inside the footer row. */
  children?: ReactNode;
}

/**
 * Footer row of a {@link ConsoleGrid} `"manual"` layout, spanning all three
 * columns below a 1px solid divider.
 */
function Footer({ children }: ConsoleGridFooterProps): JSX.Element {
  return <div className="console-grid__footer">{children}</div>;
}

/** Props for {@link ConsoleGrid}. */
export interface ConsoleGridProps {
  /** Content rendered inside the grid; composition depends on `variant`. */
  children?: ReactNode;
  /**
   * Layout variant. `"split"` (default) renders a full-width header above a
   * two-column `Left`/`Right` row. `"manual"` renders a full-width header,
   * a first row of three columns (`1fr auto auto`) via `Primary`/`Secondary`/
   * `Tertiary`, and a full-width `auto` `Footer` row below a 1px solid line.
   * `"full"` renders a full-width header above a single full-width `Content`
   * row.
   */
  variant?: "split" | "manual" | "full";
}

/**
 * Base console layout: a full-width header row above a content area. Used as
 * the starting layout for individual console views.
 */
export function ConsoleGrid({ children, variant = "split" }: ConsoleGridProps): JSX.Element {
  const className = [
    "console-grid",
    variant === "manual" && "console-grid--manual",
    variant === "full" && "console-grid--full",
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={className}>{children}</div>;
}

ConsoleGrid.Header = Header;
ConsoleGrid.Left = Left;
ConsoleGrid.Right = Right;
ConsoleGrid.Content = Content;
ConsoleGrid.Primary = Primary;
ConsoleGrid.Secondary = Secondary;
ConsoleGrid.Tertiary = Tertiary;
ConsoleGrid.Footer = Footer;
