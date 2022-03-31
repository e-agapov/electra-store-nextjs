import Layout from '../components/Layout';
import Products from '../components/Products';
import scooters from '../data/scooters';

const Scooters = () => {
	const linksCatalog = [
		{ path: '/bikes', name: 'Bikes' },
		{ path: '/scooters', name: 'Scooters' },
		{ path: '/motorbikes', name: 'Motorbikes' }
	];

	return (
		<Layout title="Products, Scooters – Electra" description="">
			<div className="container my-4 mt-md-5">
				<Products dataList={scooters} linksCatalog={linksCatalog} />
			</div>
		</Layout>
	);
};

export default Scooters;
