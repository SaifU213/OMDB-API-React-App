import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddNomination from "./components/AddNominate";
import RemoveNomination from "./components/RemoveNomination";

const App = () => {
  // useStates needed to store the arrays of movies from the search and the nomination list
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // useStates needed to change the title of the nominations list
  const [nominationTitle, setNominationTitle] = useState(
    "Nominations (Pick 5)"
  );

  // Fetches the movie data from the api as a JSON
  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=2357c7ec`;

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson);

    // Only sets the movies array value if the search value returns a movie
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // Fetches new movie data everytime the search value is changed
  useEffect(() => {
    getMovieRequest(searchValue);
  });

  // Saves the movie nominations in the movieNominations state array
  useEffect(() => {
    const movieNominations = JSON.parse(
      localStorage.getItem("react-movie-app-nominations")
    );

    if (movieNominations) {
      setNominations(movieNominations);
    }
  }, []);

  // Saves any object as a JSON file
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-nominations", JSON.stringify(items));
  };

  // Saves a movie on to the movieNominations list and updates the title of the nominations list
  const addMovieNomination = (movie) => {
    const newNominationList = [...nominations, movie];

    if (
      nominations.some((elem) => elem.imdbID === movie.imdbID) === false &&
      nominations.length <= 4
    ) {
      setNominationTitle(
        "Nominations (Pick " + (5 - (nominations.length + 1)) + ")"
      );
      setNominations(newNominationList);
      saveToLocalStorage(newNominationList);
    }
    if (nominations.length >= 4) {
      setNominationTitle("Congratulations! Your nomination list is complete!");
    }
  };

  // Removes a movie from the movieNominations list and updates the title of the nominations list
  const removeMovieNomination = (movie) => {
    const newNominationList = nominations.filter(
      (nomination) => nomination.imdbID !== movie.imdbID
    );

    setNominationTitle(
      "Nominations (Pick " + (5 - (nominations.length - 1)) + ")"
    );
    setNominations(newNominationList);
    saveToLocalStorage(newNominationList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Shopify Awards" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row gx-0">
        <MovieList
          movies={movies}
          handleNominationClick={addMovieNomination}
          nominateComponent={AddNomination}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={nominationTitle} />
      </div>
      <div className="row">
        <MovieList
          movies={nominations}
          handleNominationClick={removeMovieNomination}
          nominateComponent={RemoveNomination}
        />
      </div>
    </div>
  );
};

export default App;
