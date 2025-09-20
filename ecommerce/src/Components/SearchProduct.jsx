import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { searchProduct } from '../Redux/product/action'
import { FaSearch } from "react-icons/fa";

function SearchProduct({onSearch}) {
    const [query,setQuery]=useState("")
    // const dispatch = useDispatch()
    
    const handleChange =(e)=>{
      setQuery(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(onSearch){
          onSearch(query)
        }
        // if(query.trim()){
        //     dispatch(searchProduct(query))
        // }
    }

  return (
    <div className="flex justify-center mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-md border-2 border-blue-600 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          className=" flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="search product here"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 h-full hover:bg-blue-700 transition"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchProduct
