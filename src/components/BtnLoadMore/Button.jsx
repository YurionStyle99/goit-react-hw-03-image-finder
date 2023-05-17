import React from "react";
import PropTypes from "prop-types";
import styles from "../styles.module.css";

const Button = ({ onClick }) => {
  return (
    <button className={styles.Button} type="button" onClick={onClick} aria-label="Load more">
      Load more...
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
