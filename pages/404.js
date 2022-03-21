import Link from 'next/link';
import styles from '../scss/pages/404.module.scss';

export default function Custom404() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.infoWrapper}>
				<div className={styles.titlePage}>Page not found</div>
				<div className={styles.text404}>404</div>
				<div className={styles.moreInfoText}>
					The page you are looking for was moved, removed or maybe
					never existed. Please go to the main page.
				</div>
				<Link href={'/'}>
					<a className={styles.goHomeBtn}>Go home</a>
				</Link>
			</div>
		</div>
	);
}
