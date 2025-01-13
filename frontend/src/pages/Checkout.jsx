import React from 'react';
import PaymentForm from '../components/PaymentForm';

const Checkout = () => {
  const handlePayment = () => {
    alert('Payment successful!');
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <PaymentForm onSubmit={handlePayment} />
    </div>
  );
};

export default Checkout;
