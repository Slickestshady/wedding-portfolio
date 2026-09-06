import { site } from "../config/site.js";
import PlaceholderFrame from "../components/PlaceholderFrame.jsx";

export default function About() {
  return (
    <main className="page">
      <h2>{site.about.heading}</h2>
      <div className="about-grid">
        <div className="about-portrait">
          <PlaceholderFrame ratio={4 / 5} label="Portrait photograph" />
        </div>
        <div className="about-body">
          {site.about.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <p className="about-sign">— {site.studioName}</p>
        </div>
      </div>
    </main>
  );
}
