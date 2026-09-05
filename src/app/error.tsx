"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "./error.module.css";

export default function ErrorPage({
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
    <div className={styles.page}>
      <section className={styles.panel} aria-labelledby="error-title">
        <p className={styles.eyebrow}>Something interrupted the routine</p>
        <h1 id="error-title">This page needs another try.</h1>
        <p>
          Your browser is fine. Retry the page, or return home and continue from
          there.
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={reset}>
            Try again
          </button>
          <Link href="/">Return home</Link>
        </div>
      </section>
    </div>
  );
}
