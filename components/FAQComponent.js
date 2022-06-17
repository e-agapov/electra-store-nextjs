import { useEffect, useState } from 'react';
import CollapseGroup from './CollapseGroup';

const FAQComponent = ({ classes }) => {
	const [data, setData] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch('api/questions')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});

		return () => {
			setData([]);
			setLoading(false);
		};
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return <CollapseGroup title={'FAQ'} classes={classes} data={data} />;
};

export default FAQComponent;
