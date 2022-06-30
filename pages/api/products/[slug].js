import axios from 'axios';

export default async function handler(req, res) {
	const host = process.env.API_HOST;
	const { slug, color } = req.query;

	await axios
		.get(`${host}/api/products/${slug}${color ? '&color=' + color : ''}`)
		.then((response) => res.json(response.data))
		.catch((error) => res.json(error));
}
