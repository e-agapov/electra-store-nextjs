import { useEffect, useState } from 'react';
import CatalogLinks from '../components/CatalogLinks';
import Layout from '../components/Layout';
import Products from '../components/Products';

const Parts = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('api/parts')
			.then((res) => res.json())
			.then((data) => setData(data));

		return () => setData([]);
	}, []);

	const links = [
		{ path: '/accessories', name: 'Accessories' },
		{ path: '/parts', name: 'Parts' }
	];

	return (
		<Layout title="Products, Parts – Electra" description="">
			<div className="container my-4 mt-md-5">
				<CatalogLinks links={links} />

				<Products data={data} />
			</div>
		</Layout>
	);
};

export default Parts;
