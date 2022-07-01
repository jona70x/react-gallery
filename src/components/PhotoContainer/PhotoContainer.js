import React from "react";
import styles from "./PhotoContainer.module.css";

const PhotoContainer = (props) => {
  const imageResults = props.photoArray.map((photo, i) => {
    return (
      <li key={i}>
        <img
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={"random image of " + props.query}
        />
      </li>
    );
  });

  return (
    <section className={styles["photo-container"]}>
      <ul className={styles.gallery}>{imageResults}</ul>
    </section>
  );
};

export default React.memo(PhotoContainer);
