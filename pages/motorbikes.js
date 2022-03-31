import Layout from '../components/Layout';
import Products from '../components/Products';
import motorbikes from '../data/motorbikes';

const Motorbikes = () => {
	const linksCatalog = [
		{ path: '/bikes', name: 'Bikes' },
		{ path: '/scooters', name: 'Scooters' },
		{ path: '/motorbikes', name: 'Motorbikes' }
	];

	return (
		<Layout title="Products, Motorbikes – Electra" description="">
			<div className="container my-4 mt-md-5">
				<Products dataList={motorbikes} linksCatalog={linksCatalog} />
			</div>
		</Layout>
	);
};

export default Motorbikes;
