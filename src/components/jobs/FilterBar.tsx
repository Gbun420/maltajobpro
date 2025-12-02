'use client';

import React from 'react';

interface FilterBarProps {
  categories: string[];
  regions: string[];
  onFilterChange: (filters: { category: string; region: string }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, regions, onFilterChange }) => {
  const [category, setCategory] = React.useState('');
  const [region, setRegion] = React.useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, region });
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    onFilterChange({ category, region: newRegion });
  };

  return (
    <div className="bg-slate-800/70 backdrop-blur-md p-4 rounded-lg shadow-lg w-full mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-slate-300 mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={handleCategoryChange}
            className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="region-filter" className="block text-sm font-medium text-slate-300 mb-2">
            Filter by Region
          </label>
          <select
            id="region-filter"
            value={region}
            onChange={handleRegionChange}
            className="w-full bg-slate-700 text-white px-4 py-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="">All Regions</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
