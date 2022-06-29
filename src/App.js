import { useEffect, useState } from "react";
import React from "react";

import Card from "./components/UI/Card";
import SearchForm from "./components/SearchForm/SearchForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PhotoContainer from "./components/PhotoContainer/PhotoContainer";
import NavLinks from "./components/NavLinks/NavLinks";
import NotFound from "./components/PhotoContainer/NotFound";

const App = () => {
  //Contains objects of data fetched from the APIc

  const [imagesUrl, setImagesUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParameter, setSearchParameter] = useState();
  const [error, setError] = useState(null);

  //Fetch data from Flickr API
  const fetchData = async (queryString) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5b65f8fe490d51a80594722c0ece1784&tags=${queryString}&per_page=24&format=json&nojsoncallback=1`
      );

      const data = await response.json();
      console.log(data);
      if (data.stat !== "ok") {
        throw new Error("Something went wrong");
      }

      //
      const imageUrl = data.photos.photo;

      setImagesUrl(imageUrl);
      setSearchParameter(queryString);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
    setSearchParameter(queryString);
  };

  const getSearchResult = (value) => {
    setSearchParameter(() => value);
    fetchData(value);
  };
  const linkHandler = (query) => {
    setSearchParameter(() => query);
    fetchData(query);
  };

  useEffect(() => {
    fetchData("picasso");
  }, []);

  return (
    <BrowserRouter>
      <Card>
        <SearchForm searchParameter={getSearchResult} />
        <NavLinks fetchData={linkHandler} />
        <Routes>
          <Route path="/" element={<Navigate to="/picasso" />} />
          {["picasso", "beaches", "nature"].map((query) => {
            return (
              <Route
                key={query}
                path={query}
                element={
                  <PhotoContainer
                    hasError={error}
                    isLoading={isLoading}
                    photoArray={imagesUrl}
                    query={searchParameter}
                  />
                }
              />
            );
          })}

          <Route
            path={`/:${searchParameter}`}
            element={
              <PhotoContainer
                hasError={error}
                isLoading={isLoading}
                photoArray={imagesUrl}
                query={searchParameter}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Card>
    </BrowserRouter>
  );
};

export default App;
