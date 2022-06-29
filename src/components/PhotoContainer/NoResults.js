const NoResults = (props) => {
  return (
    <div className={props.className}>
      <h3>Your search did not have any matches</h3>
      <p>
        Sorry, we could not find anything with the information provided. Please
        try again.
      </p>
    </div>
  );
};

export default NoResults;
