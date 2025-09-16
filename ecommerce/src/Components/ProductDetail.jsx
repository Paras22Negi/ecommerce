import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductDetail } from '../Redux/product/action'

function ProductDetail() {
    const { loading, error, productDetail } = useSelector((state) => state.productState );
    
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchProductDetail(id))
    },[dispatch,id])
  return (
    <div>
      <h2>Product details</h2>
      {productDetail.title}
      <img src={productDetail.images} className='w-[200px]' />
      
    </div>
  )
}

export default ProductDetail
