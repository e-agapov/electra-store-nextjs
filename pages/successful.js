import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../scss/pages/Successful.module.scss';

const Successful = () => {
	const [data, setData] = useState(null);
	const router = Router;
	const texts = {
		success:
			'Thank you for your order! We confirm your order and will contact you shortly. If you have any questions, you can contact us. Our contact information have service page.'
	};

	useEffect(() => {
		if (!localStorage.getItem('cart')) {
			setTimeout(() => {
				router.push('/');
			}, 10000);
			localStorage.removeItem('cart');
		}

		if (localStorage.getItem('cart')) {
			const data = localStorage.getItem('cart')
				? JSON.parse(localStorage.getItem('cart'))
				: [];

			axios.post('/api/successful', { data }).then(function (response) {
				if (localStorage.getItem('cart')) {
					localStorage.clear();
					setData(response.data);

					setTimeout(() => {
						router.push('/');
					}, 1000 * 60 * 15);
				}
			});
		}

		return () => {
			localStorage.clear();
		};
	}, [router]);

	return (
		<Layout title="Electra – successful payment" description="">
			{(data?.id && (
				<div className={'container'}>
					<div className={styles.h1}>Success!</div>

					<div className={`my-5 ${styles.text}`}>
						Your order code:{' '}
						<span className={styles.fw}>{data?.id}</span>
					</div>

					<div className={styles.text}>{texts.success}</div>

					<div className={styles.text}>
						Our contact information have{' '}
						<Link href={'/service'}>
							<a
								className={styles.goHomeLink}
								onClick={(e) => {
									e.preventDefault(false);
									localStorage.clear();
									router.push('/');
								}}
							>
								service page
							</a>
						</Link>
						.
					</div>

					<a
						className={styles.goHomeLink}
						onClick={(e) => {
							e.preventDefault(false);
							localStorage.clear();
							router.push('/');
						}}
					>
						Go home...
					</a>
				</div>
			)) || (
				<div className={'container'}>
					<div className={styles.h1}>Error!</div>

					<a
						className={styles.goHomeLink}
						onClick={(e) => {
							e.preventDefault(false);
							localStorage.clear();
							router.push('/');
						}}
					>
						Go home...
					</a>
				</div>
			)}
		</Layout>
	);
};

export default Successful;
