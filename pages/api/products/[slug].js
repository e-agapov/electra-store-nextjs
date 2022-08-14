import axios from 'axios';

export default async function handler(req, res) {
	const host = process.env.NEXT_PUBLIC_API_HOST;
	const { slug, color, category } = req.query;

	await axios
		.get(`${host}/api/products/${slug}${color ? `?color=${color}` : ''}`)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => res.json(error));
}
