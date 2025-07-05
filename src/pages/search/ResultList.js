import React from "react";
import "./ResultList.css";

function ResultList({ results, loading, error }) {
  return (
    <div className="result-list-container">
      <h4 className="result-title">Search Result</h4>
      {loading && <div className="result-loading">Loading...</div>}
      {error && <div className="result-error">{error}</div>}
      {!loading && !error && results && results.length === 0 && (
        <div className="result-empty">No movies found.</div>
      )}
      <div className="result-list">
        {results &&
          results.map((movie) => (
            <div className="result-item" key={movie.id}>
              <img
                className="result-poster"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title || movie.name}
              />
              <div className="result-info">
                <div className="result-movie-title">
                  {movie.title || movie.name}
                </div>
                <div className="result-release-date">{movie.release_date}</div>
                <div className="result-overview">
                  {movie.overview && movie.overview.length > 120
                    ? movie.overview.slice(0, 120) + "..."
                    : movie.overview}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ResultList;
