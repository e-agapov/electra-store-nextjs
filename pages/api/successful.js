import axios from 'axios';

export default async function handler(req, res) {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  if (req.method === 'POST') {
    await axios
      .post(`${host}/api/successful`, req.body)
      .then((response) => res.json(response.data))
      .catch((error) => res.json(error));
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
