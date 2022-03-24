import Layout from '../components/Layout';
import TransportList from '../components/TransportList';

const Scooters = () => {
	const linksCatalog = [
		{ path: '/bikes', name: 'Bikes' },
		{ path: '/scooters', name: 'Scooters' },
		{ path: '/motorbikes', name: 'Motorbikes' }
	];

	return (
		<Layout title="Products, Bikes – Electra" description="">
			<div className="container my-4 mt-md-5">
				<TransportList linksCatalog={linksCatalog} />
			</div>
		</Layout>
	);
};

export default Scooters;
