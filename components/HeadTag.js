import Head from 'next/head';

const HeadTag = ({ title, description, themeColor }) => {
	return (
		<Head>
			<title>{title || 'Electra'}</title>
			<meta name="description" content={description} />
			{themeColor && <meta name={themeColor} />}
		</Head>
	);
};

export default HeadTag;
