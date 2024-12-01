import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.css';

Modal.setAppElement('#root'); 

const OtpPopup = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.trim().length === 6) {
      onVerify(otp);
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="otp-modal"
      overlayClassName="otp-overlay"
    >
      <div className="otp-container">
        <h2>OTP Verification</h2>
        <p>Please enter the OTP sent to your registered email or phone.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
          />
          <button type="submit" className="otp-button">
            Verify
          </button>
        </form>
        <button onClick={onClose} className="otp-close-button">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default OtpPopup;
