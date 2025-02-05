import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => (
  <div className="relative max-w-[640px]">
    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
  </div>
);

export default SearchBar;