// components/CTASection/CTASection.tsx
import styles from "./CTASection.module.css";

const CTASection = () => {
  return (
    <section className={styles.cta}>
      <h2>Ready for Your Next Adventure?</h2>
      <p>Explore breathtaking treks and create unforgettable memories.</p>
      <button className={styles.ctaButton}>Book a Trek</button>
    </section>
  );
};

export default CTASection;
