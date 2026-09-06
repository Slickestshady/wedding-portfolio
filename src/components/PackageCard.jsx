import { Link } from "react-router-dom";

/** One pricing card. `pkg.featured` renders the emphasised (dark) variant. */
export default function PackageCard({ pkg }) {
  return (
    <article className={`package ${pkg.featured ? "featured" : ""}`}>
      <h3 className="package-name">{pkg.name}</h3>
      <div className="package-price">{pkg.price}</div>
      <p className="package-note">{pkg.note}</p>
      <ul>
        {pkg.includes.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <Link className="btn" to="/contact">
        Inquire about {pkg.name}
      </Link>
    </article>
  );
}
