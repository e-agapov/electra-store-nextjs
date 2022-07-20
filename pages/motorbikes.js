import { useEffect, useState } from 'react';
import CatalogLinks from '../components/CatalogLinks';
import Layout from '../components/Layout';
import Products from '../components/Products';
import { links } from '../data/transportLinks';

const Motorbikes = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('api/motorbikes')
			.then((res) => res.json())
			.then((data) => setData(data));

		return () => setData([]);
	}, []);

	return (
		<Layout title="Products, Motorbikes – Electra" description="">
			<div className="container my-4 mt-md-5">
				<CatalogLinks links={links} />

				<Products data={data} />
			</div>
		</Layout>
	);
};

export default Motorbikes;
