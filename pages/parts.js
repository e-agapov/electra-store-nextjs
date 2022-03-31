import Layout from '../components/Layout';
import Products from '../components/Products';
import parts from '../data/parts';

const Parts = () => {
	const linksCatalog = [
		{ path: '/accessories', name: 'Accessories' },
		{ path: '/parts', name: 'Parts' }
	];

	return (
		<Layout title="Products, Parts – Electra" description="">
			<div className="container my-4 mt-md-5">
				<Products dataList={parts} linksCatalog={linksCatalog} />
			</div>
		</Layout>
	);
};

export default Parts;
