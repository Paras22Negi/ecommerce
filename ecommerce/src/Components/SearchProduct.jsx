import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { searchProduct } from '../Redux/product/action'

function SearchProduct() {
    const [query,setQuery]=useState("")
    const dispatch = useDispatch()
    
    const handleChange =(e)=>{
        setQuery(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(query.trim()){
            dispatch(searchProduct(query))
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        className="border-2 border-red-600"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder='search product here'
        />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchProduct
