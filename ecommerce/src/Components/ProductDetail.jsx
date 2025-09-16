import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductDetail } from '../Redux/product/action'
import { ClipLoader } from "react-spinners";

function ProductDetail() {
    const { loading, error, productDetail } = useSelector((state) => state.productState );
    
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchProductDetail(id))
    },[dispatch,id])

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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{productDetail.title}</h2>

      {/* Product Images */}
      <div className="flex gap-4 mb-6">
        {productDetail.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={productDetail.title}
            className="w-40 h-40 object-cover rounded-lg border"
          />
        ))}
      </div>

      {/* Product Info */}
      <p className="text-gray-600 mb-2">{productDetail.description}</p>
      <p className="text-lg font-semibold">Price: ${productDetail.price}</p>
      <p className="text-sm text-gray-500">
        Discount: {productDetail.discountPercentage}% | Rating: ⭐{" "}
        {productDetail.rating}
      </p>
      <p className="text-sm text-gray-500">Stock: {productDetail.stock}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {productDetail.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Reviews */}
      <div className="mt-6">
        <h3 className="font-bold mb-2">Customer Reviews</h3>
        {productDetail.reviews?.length > 0 ? (
          productDetail.reviews.map((review, i) => (
            <div key={i} className="border-b py-2">
              <p className="font-semibold">
                {review.reviewerName} - ⭐ {review.rating}
              </p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail
