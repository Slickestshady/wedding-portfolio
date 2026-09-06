import { site } from "../config/site.js";
import PackageCard from "../components/PackageCard.jsx";

export default function Packages() {
  return (
    <main className="page">
      <h2>Packages</h2>
      <p className="page-intro">
        Three ways to work together. All packages include a pre-wedding call,
        full-resolution files, and printing rights.
      </p>
      <div className="package-grid">
        {site.packages.map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} />
        ))}
      </div>
      <p className="packages-footnote">{site.packagesFootnote}</p>
    </main>
  );
}
