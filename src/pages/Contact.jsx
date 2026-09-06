import { site } from "../config/site.js";
import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
  return (
    <main className="page">
      <h2>{site.contact.heading}</h2>
      <div className="contact-grid">
        <aside className="contact-aside">
          <p>{site.contact.sub}</p>
          <p className="line">{site.contact.email}</p>
          <p className="line">{site.contact.instagram}</p>
        </aside>
        <ContactForm />
      </div>
    </main>
  );
}
