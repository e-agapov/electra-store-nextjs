const imgLoader = ({ src }) => {
	const host = process.env.API_HOST;

	return `${host}/storage/${src}`;
};

export default imgLoader;
