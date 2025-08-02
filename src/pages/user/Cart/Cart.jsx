import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // للدفع
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Visa');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('Please log in first.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://mytshop.runasp.net/api/Carts', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;
        if (data.cartResponse && Array.isArray(data.cartResponse)) {
          setItems(data.cartResponse);
          setTotalPrice(data.totalPrice || calculateTotalPrice(data.cartResponse));
          setError(null);
        } else {
          setError('Unexpected cart data.');
          setItems([]);
          setTotalPrice(0);
        }
      } catch (err) {
        setError('Failed to load cart contents.');
        setItems([]);
        setTotalPrice(0);
        console.error('Fetch cart error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // تحديث الكمية وحذف المنتجات بنفس الكود السابق
  // ... (اختصرته هنا لأنك لم تطلب تغييره)

  const updateItemCount = async (productId, newCount) => {
    if (newCount < 1) return;

    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/Carts/${productId}`,
        { quantity: newCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedItems = items.map((item) =>
        item.id === productId ? { ...item, count: newCount } : item
      );
      setItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems));
    } catch (err) {
      console.error('Failed to update count:', err.response?.data || err.message);
      alert('Failed to update quantity. Check console for details.');
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    try {
      await axios.delete(`https://mytshop.runasp.net/api/Carts/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItems = items.filter((item) => item.id !== productId);
      setItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems));
    } catch (err) {
      console.error('Failed to remove item:', err.response?.data || err.message);
      alert('Failed to remove item. Check console for details.');
    }
  };

  // ارسال الدفع مع بيانات البطاقة
  const handleCheckout = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    if (paymentMethod === 'Visa' || paymentMethod === 'MasterCard') {
      // تحقق من صحة المدخلات البسيطة
      if (!cardName || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill all the card details.');
        return;
      }
    }

    setPaymentLoading(true);
    try {
      // إرسال بيانات الدفع — API يتطلب فقط طريقة الدفع، لكن نرسل بيانات إضافية للواجهة فقط
      const response = await axios.post(
        'https://mytshop.runasp.net/api/CheckOuts/Pay',
        { PaymentMethod: paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Payment successful!');
      setItems([]);
      setTotalPrice(0);
      setShowPaymentModal(false);

      // مسح بيانات الدفع
      setCardName('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
    } catch (err) {
      console.error('Payment error:', err.response?.data || err.message);
      alert('Payment failed. Check console for details.');
    } finally {
      setPaymentLoading(false);
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
      <div className="alert alert-danger text-center mt-4">{error}</div>
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
                        <small className="text-muted">
                          Price per unit: ${item.price.toFixed(2)}
                        </small>
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

          {/* زر فتح مودال الدفع */}
          <div className="mt-4 border-top pt-4">
            <h4>
              Total: <span className="text-success">${totalPrice.toFixed(2)}</span>
            </h4>

          <button
  className="btn btn-success btn-lg mt-3 w-100"
  onClick={() => setShowPaymentModal(true)}
  disabled={items.length === 0}
>
  Payment
</button>

          </div>

      
          {showPaymentModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="paymentModalLabel"
              aria-modal="true"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="paymentModalLabel">
                      Payment Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowPaymentModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h6>Select Payment Method:</h6>
                    <div className="mb-3 d-flex gap-3 flex-wrap">
                      {['Visa', 'MasterCard', 'Cash', 'PayPal'].map((method) => (
                        <div className="form-check" key={method}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id={`pm-${method}`}
                            value={method}
                            checked={paymentMethod === method}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`pm-${method}`}
                          >
                            {method === 'Cash' ? 'Cash on Delivery' : method}
                          </label>
                        </div>
                      ))}
                    </div>

                    {(paymentMethod === 'Visa' ||
                      paymentMethod === 'MasterCard') && (
                      <>
                        <div className="mb-3">
                          <label htmlFor="cardName" className="form-label">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="cardNumber" className="form-label">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                          />
                        </div>

                        <div className="row">
                          <div className="col-6 mb-3">
                            <label htmlFor="expiryDate" className="form-label">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              maxLength={5}
                            />
                          </div>

                          <div className="col-6 mb-3">
                            <label htmlFor="cvv" className="form-label">
                              CVV
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowPaymentModal(false)}
                      disabled={paymentLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCheckout}
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Processing...
                        </>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
