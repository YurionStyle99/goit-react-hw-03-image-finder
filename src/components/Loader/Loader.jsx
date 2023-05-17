import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "../styles.module.css";

const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}>
      <ThreeDots 
height="200" 
width="200" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName={styles.dots}
visible={true}
 />
      </div>
    </div>
  );
};

export default Loader;
