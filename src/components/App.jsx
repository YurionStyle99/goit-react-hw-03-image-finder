import React, { Component } from "react";
import styles from "./styles.module.css";
import Searchbar from "./Search";
import ImageGallery from "./ImageGallery";
import Button from "./BtnLoadMore/Button";
import Modal from "./Modal";
import Loader from "./Loader/Loader";

class App extends Component {
  state = {
    searchImg: "",
    currentPage: 1,
    totalResults: 0,
    selectedImage: null,
    selectedTags: "",
    isLoadingButton: false,
  };

  handleSubmitSearch = (imgName) => {
    this.setState({ searchImg: imgName, currentPage: 1, totalResults: 0 });
  };

  updateTotalResults = (total) => {
    this.setState({ totalResults: total });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
      isLoadingButton: true,
    }));
  };

  handleOpenModal = (imageUrl, tags) => {
    this.setState({ selectedImage: imageUrl, selectedTags: tags });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  setLoadingButton = (isLoading) => {
    this.setState({ isLoadingButton: isLoading });
  };

  render() {
    const {
      searchImg,
      currentPage,
      totalResults,
      selectedImage,
      selectedTags,
      isLoadingButton,
    } = this.state;
    const showButton = totalResults > 12 && currentPage < Math.ceil(totalResults / 12);

    return (
      <div className={styles.container}>
        <Searchbar searchValue={this.handleSubmitSearch} />
        <ImageGallery
          img={searchImg}
          page={currentPage}
          updateTotalResults={this.updateTotalResults}
          onOpenModal={this.handleOpenModal}
          isLoadingButton={isLoadingButton}
          setLoadingButton={this.setLoadingButton}
        />
        {showButton && (
          <>
            {isLoadingButton && <Loader />}
            <Button onClick={this.handleLoadMore} />
          </>
        )}
        {selectedImage && (
          <Modal
            imageUrl={selectedImage}
            tags={selectedTags}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;