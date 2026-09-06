import { Link } from "react-router-dom";
import { site } from "../config/site.js";
import { collections } from "../config/gallery.js";
import PlaceholderFrame from "../components/PlaceholderFrame.jsx";

/**
 * Home — asymmetric split hero: name and invitation on the left,
 * one tall hero photograph on the right. The hero image is simply the
 * first photo of the first collection (or its placeholder), so it
 * updates automatically when real images are dropped in.
 */
export default function Home() {
  const heroImage = collections[0]?.images[0];

  return (
    <main className="hero">
      <div className="hero-copy">
        <p className="hero-kicker">{site.city}</p>
        <h1>
          {site.studioName}
          <em>{site.tagline}</em>
        </h1>
        <p className="hero-lead">{site.hero.lead}</p>
        <div className="hero-actions">
          <Link className="btn" to={site.hero.ctaPrimary.to}>
            {site.hero.ctaPrimary.label}
          </Link>
          <Link className="btn btn-quiet" to={site.hero.ctaSecondary.to}>
            {site.hero.ctaSecondary.label}
          </Link>
        </div>
      </div>

      <div className="hero-frame">
        {heroImage ? (
          <img src={heroImage.src} alt={heroImage.alt} />
        ) : (
          <PlaceholderFrame ratio={4 / 5} label="Hero photograph — a standout shot" />
        )}
      </div>
    </main>
  );
}
