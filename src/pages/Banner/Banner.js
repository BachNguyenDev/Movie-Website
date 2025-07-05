import React, { useEffect, useState } from 'react';
import './Banner.css'; 
function Banner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[currentIndex];

  return (
    <header
      className="banner d-flex align-items-end text-white"
      style={{
        height: '60vh',
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <div className="container pb-5">
        <h1 className="display-4 fw-bold">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="lead col-md-8">
          {movie?.overview && movie.overview.length > 180
            ? movie.overview.slice(0, 180) + '...'
            : movie?.overview}
        </p>
        <div className="mt-3">
          <button className="btn btn-primary me-2">Play</button>
          <button className="btn btn-secondary">My List</button>
        </div>
      </div>
    </header>
  );
}

export default Banner;
