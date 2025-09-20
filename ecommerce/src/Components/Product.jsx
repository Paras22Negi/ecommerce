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
      <div className="grid grid-cols-3 gap-4 p-4">
        {product.length > 0
          ? product.map((product) => (
              <div key={product.id} className="bg-white shado p-4 rounded">
                <img src={product.thumbnail} alt="no image uploaded" />
                <h1 className="text-lg font-bold"> {product.title} </h1>
                <button>
                  <Link to={`/productdetail/${product.id}`}>View detail</Link>
                </button>
              </div>
            ))
          : ("no Product found")}
      </div>
    </>
  );
}

export default Product
