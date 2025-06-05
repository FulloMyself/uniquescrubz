const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/payfast', (req, res) => {
  const { name, email, amount } = req.body;

  const data = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: process.env.RETURN_URL,
    cancel_url: process.env.CANCEL_URL,
    notify_url: process.env.NOTIFY_URL,
    amount: parseFloat(amount).toFixed(2),
    item_name: 'Unique Scrubz Order',
    name_first: name,
    email_address: email,
  };

  // Step 1: Create query string for signature
  const queryString = Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`)
    .join('&');

  // Step 2: Generate MD5 signature
  const signature = crypto.createHash('md5').update(queryString).digest('hex');

  // Step 3: Return full form fields with signature
  res.json({
    ...data,
    signature,
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`PayFast backend running on port ${PORT}`));
