'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-card/70 backdrop-blur-md p-4 rounded-lg shadow-lg w-full"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, keyword, or company"
          className="flex-grow bg-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., Valletta, Sliema)"
          className="bg-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <button
          type="submit"
          className="bg-secondary text-text font-bold px-6 py-3 rounded-md hover:bg-amber-500 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
