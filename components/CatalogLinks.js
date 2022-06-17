import styles from '../scss/components/LinksCatalog.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CatalogLinks({ links }) {
	const router = useRouter();

	return links ? (
		<div className={styles.links}>
			{links.map((linkCatalog) => (
				<Link key={linkCatalog.path} href={linkCatalog.path}>
					<a
						className={`${styles.link} ${
							router.pathname === linkCatalog.path &&
							styles.activeLink
						}`}
					>
						{linkCatalog.name}
					</a>
				</Link>
			))}
		</div>
	) : (
		<div>Please, add links for this component.</div>
	);
}
