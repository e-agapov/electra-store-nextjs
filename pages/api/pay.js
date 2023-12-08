import axios from 'axios';
async function handleCreateOrder(req, res) {
  const { amount, currency, description, email, name } = req.query;

  await axios({
    url: 'https://merchant.revolut.com/api/1.0/orders',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REVOLUT_API_KEY}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      amount: amount * 100 || null,
      currency: currency || 'USD',
      description: description || '',
      email: email || 'evgenyagap@icloud.com',
      name: name || 'Evgeny Agapov',
    },
  })
    .then((response) => res.status(200).json(response.data))
    .catch((error) => res.json(error));
}

export default handleCreateOrder;
