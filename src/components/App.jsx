import React, { Component } from "react";
import styles from "./styles.module.css";
import Searchbar from "./Search";
import ImageGallery from './ImageGallery';
import Button from "./BtnLoadMore/Button";

class App extends Component {
  state = {
    searchImg: '',
    currentPage: 1,
    totalResults: 0
  };

  handleSubmitSearch = imgName => {
    this.setState({ searchImg: imgName, currentPage: 1, totalResults: 0 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }));
  };

  updateTotalResults = total => {
    this.setState({ totalResults: total });
  };

  render() {
    const { searchImg, currentPage, totalResults } = this.state;
    const showButton = totalResults > 12 * (currentPage - 1);

    return (
      <div className={styles.container}>
        <Searchbar searchValue={this.handleSubmitSearch} />
        <ImageGallery img={searchImg} page={currentPage} updateTotalResults={this.updateTotalResults} />
        {showButton && <Button onClick={this.handleLoadMore} />}
      </div>
    );
  }
}


export default App;
