import React from "react";

const MovieList = (props) => {
  const NominateComponent = props.nominateComponent;

  return (
    <>
      {props.movies.map((movie) => (
        <div className="movie-data">
          <h1 className="movie-year-container d-flex justify-content-center m-3">
            ({movie.Year})
          </h1>
          <div className="image-container d-flex justify-content-start m-3">
            <img src={movie.Poster} alt="movie"></img>
            <div
              onClick={() => props.handleNominationClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <NominateComponent />
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
