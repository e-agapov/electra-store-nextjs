import axios from 'axios';

export default async function handler(req, res) {
  const host = process.env.NEXT_PUBLIC_API_HOST;

  await axios
    .get(`${host}/api/motorbikes`)
    .then((response) => res.json(response.data))
    .catch((error) => res.json(error));
}
