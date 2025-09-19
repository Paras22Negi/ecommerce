import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import SearchProduct from "./SearchProduct";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // optional

  const fetchProduct = () => {
    setLoading(true);
    setError(null);

    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProduct(res.data.products);
        setIsSearching(false);
      })
      .catch((err) => {
        setError(err.message || "SOME ISSUE");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    setError(null);
    setIsSearching(true);
    axios
      .get(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => {
        setProduct(res.data.products || []);
      })
      .catch((err) => {
        setError(err.message || "Some error occurred");
      })
      .finally(() => {
        setIsSearching(false);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <>
      <SearchProduct onSearch={handleSearch} />
      <div className="grid grid-cols-3 gap-4 p-4">
        {product.length > 0 ? (
          product.map((product) => (
            <div key={product.id} className="bg-white shadow p-4 rounded">
              <img
                src={product.thumbnail}
                alt="no image uploaded"
                className="w-full h-40 object-cover rounded"
              />
              <h1 className="text-lg font-bold mt-2">{product.title}</h1>
              <button className="mt-2 text-blue-500 underline">
                <Link to={`/productdetail/${product.id}`}>View detail</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No products found.</p>
        )}
      </div>
    </>
  );
};

export default Product;
