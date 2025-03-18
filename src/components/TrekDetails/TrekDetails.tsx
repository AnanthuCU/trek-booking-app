import styles from "./TrekDetails.module.css";

interface TrekDetailsProps {
  name: string;
  description: string;
  price: number;
}

const TrekDetails = ({ name, description, price }: TrekDetailsProps) => {
  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <p>{description}</p>
      <p className={styles.price}>Price: ${price}</p>
    </div>
  );
};

export default TrekDetails;
