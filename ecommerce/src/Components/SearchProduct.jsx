import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchProduct } from '../Redux/product/action'

function SearchProduct() {
    const [querry, setQuerry] = useState("")
    const dispatch = useDispatch()
    const handleChange =(e)=>{
        setQuerry(e.target.value)
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(querry.trim()){
            dispatch(searchProduct(querry))
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input  className='border-2'
            type:text
            value={querry}
            onChange={handleChange}
            placeholder='search product here'
            />
            <button>Search</button>
        </form>
    </div>
  )
}

export default SearchProduct