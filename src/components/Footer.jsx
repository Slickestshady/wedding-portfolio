import { site } from "../config/site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        {site.studioName} {site.studioSuffix} — {site.city}
      </span>
      <span>{site.contact.instagram}</span>
    </footer>
  );
}
