import React from "react";
import PropTypes from "prop-types";
import styles from "../styles.module.css";

const ImageGalleryItem = ({ webformatURL, tags, id, largeImageURL, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(largeImageURL, tags);
  };

  return (
    <li className={styles.ImageGalleryItem} id={id} key={id}>
      <img className={styles.ImageGalleryItem_image} src={webformatURL} alt={tags} onClick={handleClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

export default ImageGalleryItem;
