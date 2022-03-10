import Layout from '../components/Layout';
import styles from '../scss/pages/Home.module.scss';

export default function Home() {
	return (
		<Layout
			home={true}
			title="Electra Store"
			description="Internet store"
		></Layout>
	);
}
