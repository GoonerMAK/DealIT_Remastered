import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  const dialogStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '16px',
    maxWidth: '400px',
    margin: '0 auto',
    background: '#f8f4f9',
  };

  const messageStyle = {
    marginBottom: '16px',
  };

  const buttonStyle = {
    margin: '0 8px',
    padding: '8px 16px',
    background: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={dialogStyle}>
      <p style={messageStyle}>{message}</p>
      <div>
        <button style={buttonStyle} onClick={onConfirm}>
          Yes
        </button>
        <button style={buttonStyle} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;