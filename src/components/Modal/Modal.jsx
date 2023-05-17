import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "../styles.module.css";
import Loader from "components/Loader";

const modalRoot = document.querySelector("#root-modal");

class Modal extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleESC);
    document.body.style.overflow = "hidden";
    const img = new Image();
    img.src = this.props.imageUrl;
    img.onload = () => {
      this.setState({ isLoading: false });
    };
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleESC);
    document.body.style.overflow = "auto";
  }

  handleESC = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, tags } = this.props;
    const { isLoading } = this.state;

    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <img src={imageUrl} alt={tags} />
            </>
          )}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
