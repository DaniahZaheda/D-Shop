import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryDetails() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://mytshop.runasp.net/api/categories/${categoryId}/products`);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  return (
    <section className="container my-5">
      <h2 className="mb-4">Products</h2>
      {products.length === 0 ? (
        <div className="text-center p-4 rounded bg-warning-subtle text-danger fw-bold">
          No products found for this category.
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={`https://mytshop.runasp.net/images/${product.mainImg}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="mb-1"><strong>Price:</strong> ${product.price}</p>
                  <p className="mb-2"><strong>Rate:</strong> {product.rate}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-outline-primary mt-auto">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
