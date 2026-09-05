import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={`container ${styles.loading}`} role="status" aria-live="polite">
      <span className={styles.kicker}>Loading Sattva Skin</span>
      <div className={styles.line} />
      <div className={styles.cards} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
