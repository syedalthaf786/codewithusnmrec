import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log(`Searching for: ${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tutorials or projects..."
        className="px-4 py-2 border border-gray-300 rounded-l-lg"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
