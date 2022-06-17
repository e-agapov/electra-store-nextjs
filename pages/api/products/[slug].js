import axios from 'axios';

export default async function handler(req, res) {
	const host = process.env.API_HOST;

	const data = await axios
		.get(`${host}/api/products/${req.query.slug}`)
		.then((response) => res.json(response.data))
		.catch((error) => res.json(error));
}
