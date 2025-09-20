import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProductDetail } from '../Redux/product/action'
import { ClipLoader } from "react-spinners";
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  // const { loading, error, productDetail } = useSelector((state) => state.productState );
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //     dispatch(fetchProductDetail(id))
  // },[dispatch,id])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState([]);
  const fetchProductDetail = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProductDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "some error geting Product Details");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader colort="#3B82F6" size={50} />
      </div>
    );
  }
  if (error) {
    <p className="text-red-500">{error}</p>;
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{productDetail.title}</h2>
      {/*MainImage*/}
      <div className="mb-6">
        <img
          src={selectedImage || productDetail.thumbnail}
          alt={productDetail.title}
          className="w-1/2 max-h-[400px] object-contain rounded-lg border"
        />
      </div>
      {/* Product Images */}
      <div className="flex gap-4 mb-6">
        {productDetail.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${productDetail.title} ${index}`}
            className="w-15 h-15 object-cover rounded-lg border cursor-pointer hover:scale-103 transition"
            onClick={() => setSelectedImage(img)}
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
