import { useEffect, useRef, useState, useCallback } from "react";
import { collections } from "../config/gallery.js";
import PlaceholderFrame from "../components/PlaceholderFrame.jsx";
import Lightbox from "../components/Lightbox.jsx";

/*
 * ── How the gallery scroll works ─────────────────────────────────────
 * Pure CSS scroll-snap — no JS wheel interception at all.
 *
 * - The outer .gallery-viewport has `scroll-snap-type: y mandatory` and
 *   `overflow-y: scroll`. Two-finger up/down on a trackpad (or mouse
 *   wheel) scrolls vertically between shoot sections, which snap into
 *   place one at a time.
 *
 * - Each .shoot-track has `scroll-snap-type: x mandatory` and
 *   `overflow-x: auto`. Two-finger left/right on a trackpad (or a
 *   horizontal swipe on touch) browses the photos within a section.
 *
 * Why no wheel hijacking: intercepting vertical scroll and redirecting it
 * horizontally breaks native trackpad momentum and prevents users from
 * scrolling between sections with two fingers. Letting the browser own
 * all scroll feels far better on modern trackpads and touch screens.
 * ─────────────────────────────────────────────────────────────────────
 */

/** One full-viewport chapter: header, horizontal track, progress dots. */
function ShootSection({ shoot, onOpen, registerTrack }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const items = shoot.images.length
    ? shoot.images
    : shoot.placeholders.map((ratio, i) => ({
        ratio,
        label: `${shoot.title} — frame ${String(i + 1).padStart(2, "0")}`,
      }));

  // Hand this chapter's track element up so the chapter-dots can stay in sync.
  useEffect(() => {
    registerTrack(shoot.index - 1, trackRef.current);
  }, [registerTrack, shoot.index]);

  // Track which frame is nearest the viewport centre for the progress dots.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.querySelectorAll("[data-frame]"));
    const centre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    children.forEach((el, i) => {
      const mid = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(mid - centre);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <section className="shoot" id={shoot.id} aria-label={shoot.title}>
      <header className="shoot-head">
        <span className="shoot-num">{String(shoot.index).padStart(2, "0")}</span>
        <h2 className="shoot-title">{shoot.title}</h2>
        <span className="shoot-caption">{shoot.caption}</span>
      </header>

      <div className="shoot-track" ref={trackRef} onScroll={onScroll}>
        {items.map((item, i) => (
          <button
            key={i}
            data-frame
            className="frame"
            onClick={() => onOpen(item)}
            aria-label={`View ${item.alt || item.label} large`}
          >
            {item.src ? (
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            ) : (
              <PlaceholderFrame ratio={item.ratio} label={item.label} />
            )}
          </button>
        ))}
        <span className="frame-end">end of shoot — scroll down for next</span>
      </div>

      <footer className="shoot-foot">
        <div className="shoot-progress" aria-hidden="true">
          {items.map((_, i) => (
            <i key={i} className={i === active ? "on" : ""} />
          ))}
        </div>
        <span className="shoot-hint">
          ← swipe left/right to browse · scroll down for next shoot →
        </span>
      </footer>
    </section>
  );
}

export default function Portfolio() {
  const viewportRef = useRef(null);
  const tracksRef = useRef([]);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [chapter, setChapter] = useState(0);

  const registerTrack = useCallback((i, el) => {
    tracksRef.current[i] = el;
  }, []);

  // Keep the right-edge chapter dots in sync with the vertical position.
  const onViewportScroll = () => {
    const v = viewportRef.current;
    if (v) setChapter(Math.round(v.scrollTop / v.clientHeight));
  };

  const jumpTo = (i) => {
    const v = viewportRef.current;
    v?.scrollTo({ top: i * v.clientHeight, behavior: "smooth" });
  };

  return (
    <>
      <div className="gallery-viewport" ref={viewportRef} onScroll={onViewportScroll}>
        {collections.map((shoot) => (
          <ShootSection
            key={shoot.id}
            shoot={shoot}
            onOpen={setLightboxItem}
            registerTrack={registerTrack}
          />
        ))}
      </div>

      <nav className="chapter-dots" aria-label="Shoots">
        {collections.map((s, i) => (
          <button
            key={s.id}
            className={i === chapter ? "on" : ""}
            aria-label={`Go to ${s.title}`}
            onClick={() => jumpTo(i)}
          />
        ))}
      </nav>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}
