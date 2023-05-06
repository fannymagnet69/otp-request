import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState('');

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleResendClick = () => {
   
    console.log('Resend OTP');
  };

  const handleChangeNumberClick = () => {
    console.log('Change Number');
  };

  const handleVerifyClick = () => {
    if (otp.length === 6) {
      alert('Phone number is verified!');
      setShowPopup(false);
    } else {
      setOtp('');
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (!/^\d$/.test(event.key) && !['ArrowLeft', 'ArrowRight', 'Backspace'].includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === 'Backspace' && event.target.value.length === 0) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
      setOtp(prevOtp => {
        const newOtp = prevOtp.split('');
        newOtp[index - 1] = ''; 
        return newOtp.join('');
      });
    }

    if (event.key === 'ArrowRight') {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (event.key === 'ArrowLeft') {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    if (/^\d$/.test(value)) {
      setOtp(prevOtp => {
        const newOtp = prevOtp.split('');
        newOtp[index] = value;
        return newOtp.join('');
      });
    }
  };

  const handlePaste = event => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      for (let i = 0; i < 6; i++) {
        const input = inputRefs.current[i];
        if (input) {
          input.value = pastedData[i];
        }
      }
      setOtp(pastedData);
    }
  };

  const inputRefs = useRef([]);

  const renderInputFields = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <input
        key={index}
        ref={ref => (inputRefs.current[index] = ref)}
        type="text"
        value={otp[index] || ''}
        onKeyDown={event => handleInputKeyDown(event, index)}
        onChange={event => handleInputChange(event, index)}
        maxLength="1"
      />
    ));
  };

  return (
    <div className="App">
      <h2>Phone Verification</h2>
      <button className="verifyButton" onClick={handleButtonClick}>Start Verification</button>
      {showPopup && (
        <div className="phone-verification-popup">
          <div className="popup-content">
            <p>Enter the 6-digit OTP sent to your phone number.</p>
            <div className="otpContainer">
              <div className="otpInputs" onPaste={handlePaste}>
                {renderInputFields()}
              </div>
              <div className="otpActions">
                <button className="resendButton" onClick={handleResendClick}>Resend OTP</button>
                <button className="changeNumberButton" onClick={handleChangeNumberClick}>Change Number</button>
              </div>
            </div>
            <button className="verifyButton" onClick={handleVerifyClick}>Verify</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

