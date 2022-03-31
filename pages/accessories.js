import Layout from '../components/Layout';
import Products from '../components/Products';
import accessories from '../data/accessories';

const Accessories = () => {
	const linksCatalog = [
		{ path: '/accessories', name: 'Accessories' },
		{ path: '/parts', name: 'Parts' }
	];

	return (
		<Layout title="Products, Accessories – Electra" description="">
			<div className="container my-4 mt-md-5">
				<Products dataList={accessories} linksCatalog={linksCatalog} />
			</div>
		</Layout>
	);
};

export default Accessories;
