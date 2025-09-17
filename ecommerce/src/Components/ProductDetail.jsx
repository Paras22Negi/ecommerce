import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductDetail } from '../Redux/product/action'
import { ClipLoader } from 'react-spinners'


function ProductDetail() {
  const { loading, error, productDetail } = useSelector((state) => state.productState);

  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProductDetail(id))
  }, [dispatch, id])



  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ClipLoader colort="#3B82F6" size={50} />
      </div>
    )
  }
  if (error) {
    <p>{error}</p>
  }
  return (
    <div>
      <h2>Product details</h2>
      {productDetail.title}
      <img src={productDetail.images} className='w-[200px]' />

    </div>
  )
}

export default ProductDetail
