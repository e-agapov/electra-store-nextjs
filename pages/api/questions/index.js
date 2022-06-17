import axios from 'axios';

export default async function handler(req, res) {
	const host = process.env.API_HOST;

	await axios
		.get(`${host}/api/questions`)
		.then((response) => res.json(response.data))
		.catch((error) => res.json(error));
}
