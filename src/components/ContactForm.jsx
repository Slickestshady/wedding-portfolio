import { useState } from "react";
import { site } from "../config/site.js";

/**
 * ContactForm — intentionally front-end only for this prototype.
 * On submit it logs the payload and shows a success state; no network
 * request is made. To wire a real backend later, replace the body of
 * `submitInquiry` with a POST (fetch) to your endpoint — the payload
 * shape below is already what an API would expect.
 */
async function submitInquiry(payload) {
  console.log("Inquiry payload (would POST to backend):", payload);
  return { ok: true };
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sent

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const res = await submitInquiry(data);
    if (res.ok) setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <h3>{site.contact.successTitle}</h3>
        <p>{site.contact.successBody}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Your names</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="date">Wedding date</label>
        <input id="date" name="weddingDate" type="date" required />
      </div>
      <div className="field">
        <label htmlFor="message">Tell me about the day</label>
        <textarea
          id="message"
          name="message"
          placeholder="Venue, events you're planning, anything you'd like me to know"
        />
      </div>
      <button className="btn" type="submit">
        Send inquiry
      </button>
    </form>
  );
}
