import React, { Component } from "react";
import styles from "../styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "components/Loader";

class ImageGallery extends Component {
  state = {
    images: [],
    totalResults: 0,
    currentPage: this.props.page,
    isLoading: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.img !== this.props.img || prevProps.page !== this.props.page) {
      const KEY = "34890929-c294eed46e5ac027db1a12ad9";
      const url = `https://pixabay.com/api/?q=${this.props.img}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      this.setState({ isLoading: true });
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const hits = data.hits;
          const total = data.total;

          if (this.props.img !== prevProps.img) {
            this.setState({
              images: hits,
              totalResults: total,
              isLoading: false,
            });
          } else {
            this.setState((prevState) => ({
              images: [...prevState.images, ...hits],
              totalResults: total,
              isLoading: false,
            }));
          }

          this.props.updateTotalResults(total);

          if (prevProps.img !== this.props.img) {
            toast.info(`Total results: ${total}`, {
              position: "top-right",
              autoClose: 3000,
            });
          }

          this.props.setLoadingButton(false);
        })
        .catch((error) => {
          console.error("Ошибка при выполнении запроса:", error);

          toast.warn("Something went wrong", {
            position: "top-center",
            autoClose: 3000,
          });

          this.setState({ isLoading: false });

          this.props.setLoadingButton(false);
        });
    }
  }

  render() {
    const { images, totalResults, isLoading } = this.state;
    const { onOpenModal, isLoadingButton } = this.props;

    return (
      <div>
        <ul className={styles.ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              webformatURL={webformatURL}
              tags={tags}
              id={id}
              key={id}
              largeImageURL={largeImageURL}
              onOpenModal={() => onOpenModal(largeImageURL, tags)}
            />
          ))}
        </ul>
        {isLoading && <Loader />}
        {isLoadingButton && <Loader />}
        {totalResults > 0 && <ToastContainer />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  img: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  updateTotalResults: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  isLoadingButton: PropTypes.bool.isRequired,
  setLoadingButton: PropTypes.func.isRequired,
};

export default ImageGallery;