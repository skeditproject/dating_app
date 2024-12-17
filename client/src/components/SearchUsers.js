import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchUsers({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      onSearchResults(data);
      setShowSearch(false); // Hide search bar after submission
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-container">
      <button
        className="search-icon"
        onClick={() => setShowSearch((prev) => !prev)}
        aria-label="Toggle Search"
      >
        <FaSearch />
      </button>
      {showSearch && (
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by name or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-submit">Search</button>
        </form>
      )}
    </div>
  );
}

export default SearchUsers;
