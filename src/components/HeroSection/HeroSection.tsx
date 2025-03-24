// components/HeroSection/HeroSection.tsx
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Discover the Best Treks</h1>
        <p>Explore breathtaking landscapes and thrilling adventures</p>
        <button className={styles.ctaButton}>Book Your Trek</button>
      </div>
    </section>
  );
};

export default HeroSection;
