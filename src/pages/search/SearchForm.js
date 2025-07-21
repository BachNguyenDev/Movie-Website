import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './SearchForm.css'; 
import requests from '../../pages/API/Request';
import axios from '../API/Axios';
import ResultList from './ResultList';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(requests.searchMovie(query));
      setResults(res.data.results || []);
    } catch (err) {
      setError('Có lỗi xảy ra khi tìm kiếm.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };



  return (
    <>
      <form className="custom-search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder=""
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BsSearch className="search-icon" color='black'/>
          <div className="search-underline" />
        </div>
        <div className="search-btn-group">
          <button type="button" className="btn-reset" onClick={handleReset}>
            RESET
          </button>
          <button type="submit" className="btn-search">
            SEARCH
          </button>
        </div>
      </form>
      <ResultList results={results} loading={loading} error={error}  />
      
    </>
  );
}

export default SearchForm;
