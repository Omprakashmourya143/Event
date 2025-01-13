import React from 'react';

const PaymentForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Card Number"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-gray-800 text-white py-2 px-4">
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
