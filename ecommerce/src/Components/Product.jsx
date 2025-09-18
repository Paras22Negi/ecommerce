import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../Redux/product/action';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SearchProduct from './SearchProduct';

function Product() {
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector((state) => state.productState);
    useEffect(()=>{
        dispatch(fetchProduct())
    },[dispatch])
    console.log(product)
    console.log(loading)

    if(loading){
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
<SearchProduct />
        <div className="grid grid-cols-3 gap-4 p-4">
      {
      product.length>0 ? (      product.map((product) => (
        <div key={product.id} className="bg-white shado p-4 rounded">
          <img src={product.thumbnail} alt="no image uploaded" />
          <h1 className="text-lg font-bold"> {product.title} </h1>
          <button>
            <Link to={`/productdetail/${product.id}`}>View detail</Link>
          </button>
        </div>
      ))) : ("not found")

      
      
      }
    </div>
</>
  );
}

export default Product
