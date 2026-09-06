import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Packages from "./pages/Packages.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

/** Scroll to top on route change (the browser keeps position otherwise). */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  // The portfolio owns the whole viewport (scroll-snap), so the footer
  // is omitted there to keep the chapter rhythm intact.
  const showFooter = pathname !== "/portfolio";

  return (
    <>
      <ScrollReset />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}
