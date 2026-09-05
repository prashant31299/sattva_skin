import styles from "./concern.module.css";

export default function ConcernLoading() {
  return (
    <div className={styles.loadingPage} aria-busy="true" aria-label="Loading concern guide">
      <div className={styles.loadingCopy}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.loadingVisual} />
    </div>
  );
}
