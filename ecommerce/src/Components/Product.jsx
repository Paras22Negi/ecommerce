import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../Redux/product/action';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SearchProduct from './SearchProduct';

function Product() {
    // const dispatch = useDispatch()
    // const { loading, error, product } = useSelector((state) => state.productState);
    // useEffect(()=>{
    //     dispatch(fetchProduct())
    // },[dispatch])
    // console.log(product)
    // console.log(loading)

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const fetchProduct=()=>{
      setLoading(true)
      setError(null)
      axios.get("https://dummyjson.com/products").then((res)=>{
        setProduct(res.data.products)
        console.log(res)
        setIsSearching(false)
      }).catch((err)=>{
        setError(err)
      })
      .finally(()=>{
        setLoading(false)
      })
    }
    useEffect(()=>{
      fetchProduct()
    },[]);

    const handleSearch=(query)=>{
      setLoading(true)
      setError(null)
      setIsSearching(true)
      axios.get(`https://dummyjson.com/products/search?q=${query}`)
      .then((res)=>{
        setProduct(res.data.products || [])
      })
      .catch((err)=>{
        setError(err.message || "error searching product")
      })
      .finally(()=>{
        setIsSearching(false)
        setLoading(false)
      })
    }

    if(loading ){
        return(
            <div className='flex justify-center items-center h-screen'>
                <ClipLoader colort="#3B82F6" size={50} />
            </div>
        )
    }
    if(error){
        <p>{error}</p>
    }
  return (
    <>
      <SearchProduct onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {product.length > 0 ? (
          product.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col hover:shadow-lg transition"
            >
              {/* Product Image */}
              <img
                src={product.thumbnail}
                alt="no image uploaded"
                className="w-full h-48 object-cover rounded-md"
              />

              {/* Product Title */}
              <h1 className="text-lg font-semibold mt-3 text-gray-800 line-clamp-1">
                {product.title}
              </h1>

              {/* Product Price */}
              <p className="text-blue-600 font-bold text-md mt-1">
                ₹{product.price}
              </p>

              {/* Product Description */}
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              {/* Button */}
              <button className="mt-auto">
                <Link
                  to={`/productdetail/${product.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Detail
                </Link>
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No Product Found
          </p>
        )}
      </div>
    </>
  );
}

export default Product
