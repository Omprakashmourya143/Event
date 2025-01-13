const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Payment Intent
 * @param {number} amount - Amount to be charged (in cents)
 * @param {string} currency - Currency type (e.g., 'usd', 'inr')
 * @returns {object} - Stripe Payment Intent
 */
const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true, // Enable automatic payment methods
      },
    });

    return paymentIntent; // Return payment intent object
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Payment processing failed');
  }
};

module.exports = { createPaymentIntent };
