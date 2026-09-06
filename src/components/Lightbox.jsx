import { useEffect } from "react";
import PlaceholderFrame from "./PlaceholderFrame.jsx";

/**
 * Lightbox — minimal fullscreen viewer opened by clicking a gallery frame.
 * `item` is either { src, alt } for a real image or { ratio, label } for a
 * placeholder. Closes on backdrop click or Escape.
 */
export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose}>
        Close
      </button>
      {item.src ? (
        <img src={item.src} alt={item.alt} onClick={(e) => e.stopPropagation()} />
      ) : (
        <PlaceholderFrame ratio={item.ratio} label={item.label} />
      )}
    </div>
  );
}
