// components/Testimonials/Testimonials.tsx
import styles from "./Testimonials.module.css";

const testimonials = [
  { id: 1, name: "John Doe", text: "Amazing trekking experience!" },
  { id: 2, name: "Jane Smith", text: "Well-organized and fun!" },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <h2>What Our Clients Say</h2>
      <div>
        {testimonials.map((review) => (
          <blockquote key={review.id}>
            <p>"{review.text}"</p>
            <footer>- {review.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
