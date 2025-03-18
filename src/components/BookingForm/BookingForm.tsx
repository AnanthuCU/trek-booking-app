"use client";

import { useState } from "react";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name} on ${date}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Book Your Trek</h2>
      <input 
        type="text" 
        className={styles.inputField} 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="date" 
        className={styles.inputField} 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        required 
      />
      <button type="submit" className={styles.submitButton}>
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
