import React from 'react';
import './index.css';

const OrderConfirmationPopup = ({ orderId, onClose }) => {
    console.log("abc",orderId)
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h2>Order Confirmation</h2>
        </div>
        <div className="popup-body">
          <p>Your order has been placed successfully!</p>
          <p><strong>Order ID: {orderId}</strong></p>
        </div>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderConfirmationPopup;
