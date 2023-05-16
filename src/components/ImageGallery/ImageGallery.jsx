import React, { Component } from "react";
import styles from "../styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import ImageGalleryItem from "./ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    images: [],
    totalResults: 0,
    currentPage: this.props.page
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.img !== this.props.img ||
      prevProps.page !== this.props.page
    ) {
      const KEY = "34890929-c294eed46e5ac027db1a12ad9";
      const url = `https://pixabay.com/api/?q=${this.props.img}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const hits = data.hits; // Массив объектов с результатами
          const total = data.total; // Общее количество результатов

          if (this.props.img !== this.state.prevImg) {
            this.setState({
              images: hits,
              totalResults: total,
              prevImg: this.props.img, // Обновляем предыдущее значение img
            });
          } else {
            this.setState((prevState) => ({
              images: [...prevState.images, ...hits],
              totalResults: total,
            }));
          }
          // Создание уведомления о общем количестве результатов
          if (prevProps.img !== this.props.img) {
            toast.info(`Total results: ${total}`, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          console.error("Ошибка при выполнении запроса:", error);
  
          toast.warn('Something went wrong', {
            position: "top-center",
            autoClose: 3000,
          });
        });
    }
  }

  render() {
    const { images, totalResults } = this.state;

    return (
      <div>
        <ul className={styles.ImageGallery}>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              webformatURL={webformatURL}
              tags={tags}
              id={id}
              key={id}
            />
          ))}
        </ul>
        {totalResults > 0 && <ToastContainer />}
      </div>
    );
  }
}

export default ImageGallery;
