import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center space-x-2">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search users by name or email..."
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
        aria-label="Search"
      >
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBox;
