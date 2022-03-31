import Layout from '../components/Layout';
import Products from '../components/Products';
import bikes from '../data/bikes';

const Bikes = () => {
	const linksCatalog = [
		{ path: '/bikes', name: 'Bikes' },
		{ path: '/scooters', name: 'Scooters' },
		{ path: '/motorbikes', name: 'Motorbikes' }
	];

	return (
		<Layout title="Products, Bikes – Electra" description="">
			<div className="container my-4 mt-md-5">
				<Products dataList={bikes} linksCatalog={linksCatalog} />
			</div>
		</Layout>
	);
};

export default Bikes;
