import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { site } from "../config/site.js";

const links = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/packages", label: "Packages" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/** Fixed top navigation. Collapses to a simple dropdown on small screens. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <Link to="/" className="nav-name" onClick={() => setOpen(false)}>
        {site.studioName} <span>{site.studioSuffix}</span>
      </Link>

      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
