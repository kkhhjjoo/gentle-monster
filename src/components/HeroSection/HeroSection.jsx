import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}>
        <img src="/images/gentle-monster-hero.avif" alt="Gentle Monster Hero"
        className={styles.image}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>NEW COLLECTION</h1>
          <p className={styles.description}>Innovative eyewear for a bold vision.</p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection


