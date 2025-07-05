import React, { useEffect, useState } from "react";
import axios from "../API/Axios";
import requests from "../API/Request";
import "./MovieDetail.css";

function MovieDetail({ movie }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchTrailer() {
      if (!movie) return;
      const res = await axios.get(requests.fetchMovieVideos(movie.id));
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : null);
    }
    fetchTrailer();
  }, [movie]);

  if (!movie) return <div className="movie-detail">No movie selected.</div>;

  return (
    <div className="movie-detail d-flex text-white p-4 rounded">
      <div className="flex-grow-1 me-4">

        <h2>{movie.title || movie.name}</h2>
        <hr className="bg-light" />
        <div className="mb-2">
          <strong>Release Date:</strong> {movie.release_date}
        </div>
        <div className="mb-2">
          <strong>Vote:</strong> {movie.vote_average} / 10
        </div>
        <div>{movie.overview}</div>
      </div>

      <div style={{ minWidth: 650 }}>

        {trailerKey ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div>No trailer found.</div>
        )}
        
      </div>
    </div>
  );
}

export default MovieDetail;
