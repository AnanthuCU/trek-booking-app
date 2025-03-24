import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>TrekBooking</div>
      <ul className={styles.navList}>
        <li>
          <Link className={styles.navlink} href="/">Home</Link>
        </li>
        <li>
          <Link className={styles.navlink} href="/treks">Treks</Link> {/* ✅ Navigates to Treks page */}
        </li>
        <li>  
          <Link className={styles.navlink} href="/contact">Contact</Link> {/* ✅ Navigates to Contact page */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
