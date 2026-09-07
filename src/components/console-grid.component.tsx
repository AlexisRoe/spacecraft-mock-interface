import type { JSX, ReactNode } from "react";

import "./console-grid.component.css";

/** Props for {@link ConsoleGrid.Header}. */
export interface ConsoleGridHeaderProps {
  /** Content rendered inside the header area. */
  children?: ReactNode;
}

/** Header area of a {@link ConsoleGrid} layout, spanning both columns. */
function Header({ children }: ConsoleGridHeaderProps): JSX.Element {
  return <div className="console-grid__header">{children}</div>;
}

/** Props for {@link ConsoleGrid.Left}. */
export interface ConsoleGridLeftProps {
  /** Content rendered inside the left column. */
  children?: ReactNode;
}

/** Left column of a {@link ConsoleGrid} layout. */
function Left({ children }: ConsoleGridLeftProps): JSX.Element {
  return <div className="console-grid__left">{children}</div>;
}

/** Props for {@link ConsoleGrid.Right}. */
export interface ConsoleGridRightProps {
  /** Content rendered inside the right column. */
  children?: ReactNode;
}

/** Right column of a {@link ConsoleGrid} layout. */
function Right({ children }: ConsoleGridRightProps): JSX.Element {
  return <div className="console-grid__right">{children}</div>;
}

/** Props for {@link ConsoleGrid}. */
export interface ConsoleGridProps {
  /** Should be composed of {@link ConsoleGrid.Header}, {@link ConsoleGrid.Left}, and
   * {@link ConsoleGrid.Right}. */
  children?: ReactNode;
}

/**
 * Base 2x2 console layout: a full-width header row above a two-column content
 * row. Used as the starting layout for individual console views.
 */
export function ConsoleGrid({ children }: ConsoleGridProps): JSX.Element {
  return <div className="console-grid">{children}</div>;
}

ConsoleGrid.Header = Header;
ConsoleGrid.Left = Left;
ConsoleGrid.Right = Right;
