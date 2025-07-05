import React from 'react';
import MovieDetail from '../MovieDetail/MovieDetail';
import './MovieList.css';

function MovieList({ moviesByCategory, categories, onMovieClick, selected }) {
  return (
    <div className="container">
      {categories.map((cat) => (
        <div key={cat.title} className="mb-4">
          <h3>{cat.title}</h3>
          <div className="row flex-nowrap overflow-auto">
            {moviesByCategory[cat.title]?.map((movie) => (
              <div
                key={movie.id}
                className="col-2 movie-item"
                onClick={() => onMovieClick(cat.title, movie)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="img-fluid rounded mb-2"
                />
                <div className="text-truncate">{movie.title || movie.name}</div>
              </div>
            ))}
          </div>
          {selected.category === cat.title && selected.movie && (
            <MovieDetail movie={selected.movie} />
          )}
        </div>
      ))}
    </div>
  );
}

export default MovieList;