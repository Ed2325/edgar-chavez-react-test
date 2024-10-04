import React from "react";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFoundCard}> 404!</div>
    </div>
  );
};

export default NotFound;
