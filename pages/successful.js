import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../scss/pages/Successful.module.scss';

const Successful = () => {
	const router = Router;
	const texts = {
		success:
			'Thank you for your order! We confirm your order and will contact you shortly. If you have any questions, you can contact us. Our contact information have service page.'
	};

	useEffect(() => {
		if (localStorage.getItem('cart')) {
			setTimeout(() => {
				localStorage.clear();
				router.push('/');
			}, 1000 * 60 * 15);
		} else {
			router.push('/');
		}

		localStorage.clear();
	}, [router]);

	return (
		<Layout title="Electra – successful payment" description="">
			<div className={'container'}>
				<div className={styles.h1}>Success!</div>

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
		</Layout>
	);
};

export default Successful;
