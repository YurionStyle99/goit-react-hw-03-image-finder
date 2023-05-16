import React, { Component } from "react";
import { FaSistrix } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles.module.css";

class Searchbar extends Component {
  state = {
    searchImg: '',
    isToastOpen: false,
  }

  handleChangeSearch = evt => {
    this.setState({ searchImg: evt.currentTarget.value.toLowerCase() });
  }

  handleOnSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchImg === '') {
      this.showToastWarning("Set name");
    } else {
      this.props.searchValue(this.state.searchImg);
      this.setState({ searchImg: '' });
    }
  }

  showToastWarning = message => {
    if (!this.state.isToastOpen) {
      toast.warn(message, {
        toastId: "custom-id-yes",
        onClose: () => this.setState({ isToastOpen: false }),
      });
      this.setState({ isToastOpen: true });
    }
  }

  render() {
    const { searchImg } = this.state;

    return (
      <header className={styles.Searchbar} onSubmit={this.handleOnSubmit}>
        <form className={styles.SearchForm}>
          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            value={searchImg}
            placeholder="Search images and photos"
            onChange={this.handleChangeSearch}
          />
          <button type="submit" className={styles.SearchForm_button}>
            <FaSistrix />
          </button>
        </form>
        <ToastContainer />
      </header>
    );
  }
}

export default Searchbar;
