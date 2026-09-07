import { useEffect, useState } from "react";

/**
 * Return value of {@link useOrientation}.
 */
export interface UseOrientationReturn {
  /** True when the viewport is currently taller than it is wide. */
  isPortrait: boolean;
}

/**
 * Tracks whether the viewport is in portrait orientation, so the app can
 * prompt the captain to rotate their device into the required landscape mode.
 */
export function useOrientation(): UseOrientationReturn {
  const [isPortrait, setIsPortrait] = useState(() => window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsPortrait(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isPortrait };
}
