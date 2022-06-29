import NoResults from "./NoResults";

import Spinner from "../UI/Spinner";

const PhotoContainer = (props) => {
  console.log(props.photoArray);
  const imageResults = props.photoArray.map((photo, i) => {
    return (
      <li key={props.query + i}>
        <img
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={props.query}
        />
      </li>
    );
  });

  //Conditionally rendering message to user
  let message = <h2>{props.query || "Results"} </h2>;
  if (props.hasError || imageResults.length === 0) {
    message = <NoResults className="not-found" />;
  }

  if (props.isLoading) {
    message = <Spinner />;
  }

  return (
    <div className="photo-container">
      {message}
      <ul>{!props.isLoading && imageResults}</ul>
    </div>
  );
};

export default PhotoContainer;
