import { useEffect, useRef, useState, useCallback } from "react";
import { collections } from "../config/gallery.js";
import PlaceholderFrame from "../components/PlaceholderFrame.jsx";
import Lightbox from "../components/Lightbox.jsx";

/*
 * ── How the gallery scroll works ─────────────────────────────────────
 * Approach chosen: CSS scroll-snap for structure + a single small wheel
 * handler, rather than full JS scroll-hijacking.
 *
 * - The outer .gallery-viewport scrolls vertically with
 *   `scroll-snap-type: y mandatory`, so each shoot is a full-viewport
 *   "chapter" that snaps into place.
 * - Each chapter contains a .shoot-track that scrolls horizontally
 *   (`overflow-x: auto`).
 * - One `wheel` listener translates vertical wheel/trackpad input into
 *   horizontal movement on the *current* chapter's track. Only when the
 *   track has reached its end (in the direction of travel) do we let the
 *   event fall through, so native vertical snap carries the visitor to
 *   the next chapter.
 *
 * Why this hybrid: the browser keeps ownership of scrolling (momentum,
 * snap physics, accessibility, no dependencies), and the JS surface is
 * ~20 lines that only redirects wheel input — much less fragile than
 * re-implementing scrolling wholesale.
 *
 * Touch devices: `wheel` events don't fire on touch, so phones never see
 * the hijack. There, the natural gestures apply — vertical swipe moves
 * between chapters (outer snap container), horizontal swipe browses the
 * photos (each track is a native swipeable carousel). This is the
 * deliberate mobile fallback: no vertical-touch hijacking at all.
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

  // Hand this chapter's track element up to the page-level wheel handler.
  useEffect(() => registerTrack(shoot.index - 1, trackRef.current), [registerTrack, shoot.index]);

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
        <span className="frame-end">end of this shoot — keep scrolling</span>
      </div>

      <footer className="shoot-foot">
        <div className="shoot-progress" aria-hidden="true">
          {items.map((_, i) => (
            <i key={i} className={i === active ? "on" : ""} />
          ))}
        </div>
        <span className="shoot-hint">
          scroll to browse this shoot
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
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

  // Wheel translation: vertical wheel → horizontal movement inside the
  // current chapter, until its track is exhausted in that direction.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e) => {
      const idx = Math.round(viewport.scrollTop / viewport.clientHeight);
      const track = tracksRef.current[idx];
      if (!track) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : 0;
      if (delta === 0) return; // pure horizontal trackpad input scrolls the track natively

      const maxLeft = track.scrollWidth - track.clientWidth;
      const canGo =
        delta > 0 ? track.scrollLeft < maxLeft - 1 : track.scrollLeft > 1;

      if (canGo) {
        e.preventDefault();
        track.scrollLeft += delta;
      }
      // else: let the event through — the outer container snaps to the
      // previous/next chapter natively.
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
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
