const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const qs = require('querystring');

// Payfast merchant credentials (ensure these match your environment)
const merchant_id = '11469840';
const merchant_key = 'sayrtqqspywws';
const passphrase = ''; // Only set if your Payfast account uses one

router.post('/pay', (req, res) => {
  try {
    const { amount, name, email } = req.body;

    if (!amount || !name || !email) {
      return res.status(400).send('Missing required fields.');
    }

    const data = {
      merchant_id,
      merchant_key,
      return_url: 'https://uniquescrubz.co.za/thank-you',
      cancel_url: 'https://uniquescrubz.co.za/cancelled',
      notify_url: 'https://uniquescrubz.co.za/api/payfast/webhook',
      amount: parseFloat(amount).toFixed(2),
      item_name: 'Unique Scrubz Order',
      name_first: name,
      email_address: email,
    };

    // 1. Sort & build query string
    const sorted = Object.keys(data)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');

    const signatureBase = passphrase ? `${sorted}&passphrase=${encodeURIComponent(passphrase)}` : sorted;

    // 2. Create signature
    const signature = crypto.createHash('md5').update(signatureBase).digest('hex');

    // 3. Final redirect URL
    const fullQuery = `${sorted}&signature=${signature}`;
    const payfastUrl = `https://www.payfast.co.za/eng/process?${fullQuery}`;

    console.log('[Payfast] Final Redirect URL:', payfastUrl); // DEBUG

    // 4. Redirect user
    return res.redirect(payfastUrl);
  } catch (err) {
    console.error('[Payfast ERROR]', err);
    return res.status(500).send('Failed to initiate Payfast payment.');
  }
});

module.exports = router;
