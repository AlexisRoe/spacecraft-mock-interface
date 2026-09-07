import "./rotate-device-notice.component.css";

/**
 * Full-screen notice shown when the device is held in portrait orientation,
 * instructing the captain to rotate into the required landscape mode.
 */
export function RotateDeviceNotice() {
  return (
    <div role="alert" className="rotate-device-notice">
      <p className="rotate-device-notice__text">Rotate device to landscape</p>
    </div>
  );
}
