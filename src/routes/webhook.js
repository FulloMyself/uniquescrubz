// routes/webhook.js
const express = require('express');
const router = express.Router();

router.post('/webhook', express.urlencoded({ extended: false }), (req, res) => {
  const data = req.body;

  // ✅ You can verify the payment status here
  if (data.payment_status === 'COMPLETE') {
    console.log('✅ Payment successful for:', data.email_address);

    // TODO: Store confirmation, send email, update DB, etc.
  } else {
    console.warn('⚠️ Payment not completed:', data.payment_status);
  }

  res.sendStatus(200); // Important for Payfast
});

module.exports = router;