import React, { useState } from 'react';

function SearchProduct({ onSearch }) {
  const [querry, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSearch) onSearch(querry)
   };

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="border-2 border-gray-300 px-4 py-2 rounded w-80"
          type="text"
          value={querry}
          onChange={handleChange}
          placeholder="Search product here"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchProduct;
