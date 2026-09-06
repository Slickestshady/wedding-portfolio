/**
 * PlaceholderFrame — an elegant stand-in shown wherever a real photograph
 * will eventually go. Renders a soft, printed-paper gradient with faint
 * grain and a small label, at the exact aspect ratio the real image will
 * occupy, so the layout can be judged honestly before photos arrive.
 */
export default function PlaceholderFrame({ ratio = 3 / 2, label = "Photograph" }) {
  return (
    <div className="placeholder" style={{ aspectRatio: ratio }} aria-hidden="true">
      <span className="placeholder-label">{label}</span>
    </div>
  );
}
