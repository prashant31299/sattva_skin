import styles from "./shop.module.css";

export default function ShopLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Loading shop">
      <div className={styles.loadingHero} />
      <div className={styles.loadingGrid}>
        {Array.from({ length: 8 }, (_, index) => (
          <div className={styles.loadingCard} key={index} />
        ))}
      </div>
    </div>
  );
}
