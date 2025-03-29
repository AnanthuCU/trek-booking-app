import React from "react";
import styles from "./ToolButton.module.css";

interface Props {
  title: string;
  onClick: () => void;
}

const ToolButton = ({ title, onClick }: Props) => {
  return (
    <button className={styles["container"]} onClick={onClick}>
      {title}
    </button>
  );
};

export default ToolButton;
