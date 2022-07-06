const imgLoader = ({ src }) => {
	return `${process.env.API_HOST}/storage/${src}`;
};

export default imgLoader;
