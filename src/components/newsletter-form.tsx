"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./newsletter-form.module.css";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={styles.success} role="status">
        Newsletter signup is not connected in this design preview yet.
      </p>
    );
  }

  return (
    <div className={styles.wrap}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        aria-describedby="newsletter-preview-note"
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          required
        />
        <button type="submit" aria-label="Preview the newsletter signup state">
          Preview signup <ArrowRight aria-hidden="true" size={16} />
        </button>
      </form>
      <p className={styles.note} id="newsletter-preview-note">
        Preview only—no email address is stored or sent.
      </p>
    </div>
  );
}
