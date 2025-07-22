import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError("Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://mytshop.runasp.net/api/Carts', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;
        if (data.cartResponse && Array.isArray(data.cartResponse)) {
          setItems(data.cartResponse);
          setTotalPrice(data.totalPrice || calculateTotalPrice(data.cartResponse));
          setError(null);
        } else {
          setError("Unexpected cart data.");
          setItems([]);
          setTotalPrice(0);
        }
      } catch (err) {
        setError("Failed to load cart contents.");
        setItems([]);
        setTotalPrice(0);
        console.error("Fetch cart error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateItemCount = async (productId, newCount) => {
    if (newCount < 1) return;

    const token = localStorage.getItem('userToken');
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/Carts/${productId}`,
        { quantity: newCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedItems = items.map(item =>
        item.id === productId ? { ...item, count: newCount } : item
      );
      setItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems));
    } catch (err) {
      console.error("Failed to update count:", err.response?.data || err.message);
      alert("Failed to update quantity. Check console for details.");
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      await axios.delete(`https://mytshop.runasp.net/api/Carts/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedItems = items.filter(item => item.id !== productId);
      setItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems));
    } catch (err) {
      console.error("Failed to remove item:", err.response?.data || err.message);
      alert("Failed to remove item. Check console for details.");
    }
  };

  const getImageUrl = (img) => {
    return img
      ? `https://mytshop.runasp.net/Images/${img}`
      : 'https://via.placeholder.com/200x200?text=No+Image';
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="row">
            {items.map((item) => (
              <div className="col-md-6 mb-4" key={item.id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={getImageUrl(item.mainImg)}
                    className="card-img-top"
                    alt={item.name}
                    style={{ objectFit: 'contain', height: '200px' }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">
                        <small className="text-muted">Price per unit: ${item.price.toFixed(2)}</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div>
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={() => updateItemCount(item.id, item.count - 1)}
                          disabled={item.count <= 1}
                        >
                          −
                        </button>
                        <span className="fw-bold">{item.count}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm ms-2"
                          onClick={() => updateItemCount(item.id, item.count + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success mb-2">
                          ${(item.price * item.count).toFixed(2)}
                        </div>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-top pt-3">
            <h4>
              Total: <span className="text-success">${totalPrice.toFixed(2)}</span>
            </h4>
          </div>
        </>
      )}
    </div>
  );
}
