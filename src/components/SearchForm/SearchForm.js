import { useState } from "react";

import SearchIcon from "./SearchIcon";

const SearchForm = (props) => {
  const [inputValue, setInputValue] = useState("");
  //Get data from input
  const inputChangeHandler = (e) => {
    const cleanInputValue = e.target.value.trim().toLowerCase();
    setInputValue(() => cleanInputValue);
  };

  //Get data from Search form
  const searchHandler = (e) => {
    e.preventDefault();
    props.navigateTo(inputValue);
    setInputValue(() => "");
  };

  return (
    <form className="search-form" onSubmit={searchHandler}>
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={inputValue}
        required
        onChange={inputChangeHandler}
      />
      <button type="submit" className="search-button">
        {" "}
        <SearchIcon />
      </button>{" "}
    </form>
  );
};

export default SearchForm;
