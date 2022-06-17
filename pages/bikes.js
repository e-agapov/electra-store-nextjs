import { useEffect, useState } from 'react';
import CatalogLinks from '../components/CatalogLinks';
import Layout from '../components/Layout';
import Products from '../components/Products';

const Bikes = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch('api/bikes')
			.then((res) => res.json())
			.then((data) => setData(data));

		return () => setData([]);
	}, []);

	const links = [
		{ path: '/bikes', name: 'Bikes' },
		{ path: '/scooters', name: 'Scooters' },
		{ path: '/motorbikes', name: 'Motorbikes' }
	];

	return (
		<Layout title="Products, Bikes – Electra" description="">
			<div className="container my-4 mt-md-5">
				<CatalogLinks links={links} />

				<Products data={data} />
			</div>
		</Layout>
	);
};

export default Bikes;
