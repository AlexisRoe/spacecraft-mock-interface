import type { JSX, ReactNode } from "react";

import "./application-frame.component.css";

/** Props for {@link ApplicationFrame.Header}. */
export interface ApplicationFrameHeaderProps {
    /** Content rendered inside the header area. */
    children?: ReactNode;
}

/** Header area of an {@link ApplicationFrame} grid layout. */
function Header({ children }: ApplicationFrameHeaderProps): JSX.Element {
    return <header className="application-frame__header flex-row">{children}</header>;
}

/** Props for {@link ApplicationFrame.Content}. */
export interface ApplicationFrameContentProps {
    /** Content rendered inside the content area. */
    children?: ReactNode;
}

/** Content area of an {@link ApplicationFrame} grid layout. */
function Content({ children }: ApplicationFrameContentProps): JSX.Element {
    return <main className="application-frame__content">{children}</main>;
}

/** Props for {@link ApplicationFrame.Footer}. */
export interface ApplicationFrameFooterProps {
    /** Content rendered inside the footer area. */
    children?: ReactNode;
}

/** Footer area of an {@link ApplicationFrame} grid layout. */
function Footer({ children }: ApplicationFrameFooterProps): JSX.Element {
    return <footer className="application-frame__footer flex-row">{children}</footer>;
}

/** Props for {@link ApplicationFrame}. */
export interface ApplicationFrameProps {
    /** Should be composed of {@link ApplicationFrame.Header}, {@link ApplicationFrame.Content},
     * and/or {@link ApplicationFrame.Footer}. */
    children?: ReactNode;
}

/** Full-viewport header/content/footer grid layout. Use the `Header`, `Content`, and `Footer`
 * sub-components to populate each grid area. */
export function ApplicationFrame({ children }: ApplicationFrameProps): JSX.Element {
    return <div className="application-frame">{children}</div>;
}

ApplicationFrame.Header = Header;
ApplicationFrame.Content = Content;
ApplicationFrame.Footer = Footer;
