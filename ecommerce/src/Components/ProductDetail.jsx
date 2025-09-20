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
  const [imgLoading, setImgLoading] =useState(false)
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

  const handleImgChange=(img)=>{
    setImgLoading(true)
    setSelectedImage(img)
  }
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {productDetail.title}
      </h2>

      {/* Main Layout: Image + Info side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div>
          {/* Main Image */}
          <div className="mb-4">
            {imgLoading && (
              <div className="absolute flex justify-center items-center w-[540px] h-[400px] bg-white/60 rounded-lg">
                <ClipLoader color="#3B82F6" size={50} />
              </div>
            )}
            <img
              src={selectedImage || productDetail.thumbnail}
              alt={productDetail.title}
              className="w-full h-[400px] object-contain rounded-lg border shadow-sm "
              onLoad={() => setImgLoading(false)}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-3 flex-wrap">
            {productDetail.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${productDetail.title} ${index}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition transform hover:scale-105 ${
                  selectedImage === img ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleImgChange(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-gray-700 mb-3">{productDetail.description}</p>

          <p className="text-2xl font-bold text-blue-600 mb-2">
            ${productDetail.price}
          </p>

          <p className="text-sm text-gray-500 mb-1">
            Discount:{" "}
            <span className="text-green-600 font-semibold">
              {productDetail.discountPercentage}%
            </span>{" "}
            | Rating: ⭐ {productDetail.rating}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Stock:{" "}
            {productDetail.stock > 0 ? (
              <span className="text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </p>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {productDetail.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-900 transition">
              Add to Cart
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
        {productDetail.reviews?.length > 0 ? (
          productDetail.reviews.map((review, i) => (
            <div key={i} className="border-b py-3">
              <p className="font-semibold text-gray-800">
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
