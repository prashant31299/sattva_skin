import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`}>
      <p className="eyebrow">404 · Page not found</p>
      <h1 className="section-title">This routine took a wrong turn.</h1>
      <p>Let’s get you back to problem-solving skincare.</p>
      <Link className="button" href="/">
        Back to home
      </Link>
    </section>
  );
}
