import React from 'react';
import { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import NavBar from '../Navbar/NavBar';
import axios from '../API/Axios';
import requests from '../API/Request';
import MovieList from '../MovieList/MovieList';
import './Browse.css';

const categories = [
  { title: 'Trending', fetchUrl: requests.fetchTrending },
  { title: 'Netflix Originals', fetchUrl: requests.fetchNetflixOriginals },
  { title: 'Top Rated', fetchUrl: requests.fetchTopRated },
  { title: 'Action Movies', fetchUrl: requests.fetchActionMovies },
  { title: 'Comedy Movies', fetchUrl: requests.fetchComedyMovies },
  { title: 'Horror Movies', fetchUrl: requests.fetchHorrorMovies },
  { title: 'Romance Movies', fetchUrl: requests.fetchRomanceMovies },
  { title: 'Documentaries', fetchUrl: requests.fetchDocumentaries },
];

function Browse() {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [selected, setSelected] = useState({ category: null, movie: null });

  useEffect(() => {
    async function fetchAll() {
      const results = {};
      for (const cat of categories) {
        try {
          const res = await axios.get(cat.fetchUrl);
          results[cat.title] = res.data.results || [];
        } catch (err) {
          results[cat.title] = [];
        }
      }
      setMoviesByCategory(results);
      
    }
    fetchAll();
  }, []);

  return (
    <div>
      <NavBar/>
      <Banner movies={moviesByCategory['Netflix Originals'] || []}/>
      <MovieList
        moviesByCategory={moviesByCategory}
        categories={categories}
        onMovieClick={(category, movie) => setSelected({ category, movie })}
        selected={selected}
      />
    </div>
  );
}

export default Browse;

