import React from "react";
import styles from "../styles.module.css";

const Button = ({ onClick }) => {
  return (
    <button className={styles.Button} type="button" onClick={onClick} aria-label="Load more">
      Load more...
    </button>
  );
};

export default Button;
