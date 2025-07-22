import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`https://mytshop.runasp.net/api/products/${productId}`);
      setProduct(data);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct({});
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً لإضافة المنتج إلى العربة.");
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/Carts/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("تمت إضافة المنتج إلى العربة بنجاح!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("فشل في إضافة المنتج: " + (err.response?.data?.title || err.message));
    }
  };

  return (
    <section className="container my-5">
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`https://mytshop.runasp.net/images/${product.mainImg}`}
              className="img-fluid rounded-start"
              alt={product.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="card-text">{product.description}</p>
              <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              <p className="card-text"><strong>Rate:</strong> {product.rate}</p>
              <p className="card-text"><strong>In Stock:</strong> {product.quantity}</p>
              
           
              <button onClick={() => addToCart(productId)} className="btn btn-success">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-5 mb-3">Customer Reviews</h4>
      {reviews.length === 0 ? (
        <div className="alert alert-info">No reviews yet.</div>
      ) : (
        reviews.map((rev, idx) => (
          <div key={idx} className="card mb-3 border-success">
            <div className="card-body">
              <p><strong>Rate:</strong> {rev.rate}</p>
              <p><strong>Comment:</strong> {rev.comment}</p>
              <p><strong>Date:</strong> {new Date(rev.reviewDate).toLocaleDateString()}</p>
              <p><strong>Reviewer:</strong> {rev.reviewerName}</p>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
