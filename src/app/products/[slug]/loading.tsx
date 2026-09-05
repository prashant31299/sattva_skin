import styles from "./product.module.css";

export default function ProductLoading() {
  return (
    <div className={styles.loadingPage} aria-busy="true" aria-label="Loading product">
      <div className={styles.loadingGallery} />
      <div className={styles.loadingSummary}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
