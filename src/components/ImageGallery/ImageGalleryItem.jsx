import styles from "../styles.module.css";

const ImageGalleryItem = ({ webformatURL, tags, id}) => {
  return (
<li className={styles.ImageGalleryItem} id={id} key={id}>
              <img className={styles.ImageGalleryItem_image} src={webformatURL} alt={tags} />
            </li>
  );
};



export default ImageGalleryItem;