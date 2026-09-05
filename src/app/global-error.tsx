"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "./error.module.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className={styles.page}>
          <section className={styles.panel} aria-labelledby="global-error-title">
            <p className={styles.eyebrow}>Sattva Skin</p>
            <h1 id="global-error-title">The site needs another try.</h1>
            <p>
              An unexpected error interrupted this page. Retry now, or return to
              the homepage.
            </p>
            <div className={styles.actions}>
              <button type="button" onClick={reset}>
                Try again
              </button>
              <Link href="/">Return home</Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
