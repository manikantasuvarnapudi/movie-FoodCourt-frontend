import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './index.css';

const OtpPopup = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if ("OTPCredential" in window) {
      navigator.credentials
        .get({ otp: { transport: ["sms"] } })
        .then((otpCredential) => {
          const extractedOtp = otpCredential.code;
          setOtp(extractedOtp); 
          onVerify(extractedOtp);
          console.log("Received OTP:", extractedOtp);
        })
        .catch((err) => {
          console.error("Error reading OTP:", err);
        });
    }
  }, [onVerify]);

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
        <p>Please enter the OTP sent to your registered <strong>Email</strong> or <strong>Phone</strong>.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
            inputMode="numeric"
            autoComplete="one-time-code" 
          />
          <button type="submit" className="otp-button">
            Verify
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default OtpPopup;
