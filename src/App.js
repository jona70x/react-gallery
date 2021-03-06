import { useEffect, useState, useCallback } from "react";
import React from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

//importing API key.
// import KEY from "./config";

// In order to make this project work, you will need an api key from flickr.
//Here is the link  to apply for a non-commercial one: https://www.flickr.com/services/apps/create/apply/

/** IMPORTANT NOTE
 *
 * I am using and exposing my own API key only for educational purposes.
 * Exposing configuration files and API keys are not recommended
 *
 */

//importing other components
import Card from "./components/UI/Card";
import SearchForm from "./components/SearchForm/SearchForm";
import PhotoContainer from "./components/PhotoContainer/PhotoContainer";
import NavLinks from "./components/NavLinks/NavLinks";
import NotFound from "./components/PhotoContainer/NotFound";
import NoResults from "./components/PhotoContainer/NoResults";
import Spinner from "./components/UI/Spinner";
import Welcome from "./components/PhotoContainer/Welcome";

const App = () => {
  //Using state and react router hooks
  let location = useLocation();
  let navigate = useNavigate();
  const [imagesUrl, setImagesUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch data from Flickr API
  const fetchData = useCallback(async (queryString) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5b65f8fe490d51a80594722c0ece1784&tags=${queryString}&per_page=24&format=json&nojsoncallback=1`
      );

      const data = await response.json();
      if (data.stat !== "ok") {
        throw new Error("Something went wrong");
      }

      //
      const imageUrl = data.photos.photo;

      setImagesUrl(imageUrl);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  }, []);

  const getSearchResult = (value) => {
    navigate(`/${value}`);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      fetchData(location.pathname);
    }
  }, [location.pathname, fetchData]);

  //Conditionally rendering message to user
  let message = <h2>{location.pathname.slice(1)} </h2>;

  if (error || imagesUrl.length === 0) {
    message = <NoResults className="not-found" />;
  }

  if (isLoading) {
    message = <Spinner />;
  }

  return (
    <Card>
      <SearchForm navigateTo={getSearchResult} />
      <NavLinks searchParameter={getSearchResult} />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path=":userId"
          element={
            <>
              {message}
              {!isLoading && (
                <PhotoContainer
                  photoArray={imagesUrl}
                  query={location.pathname.slice(1)}
                />
              )}
            </>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Card>
  );
};

export default App;
