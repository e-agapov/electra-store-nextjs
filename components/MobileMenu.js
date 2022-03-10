import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../scss/components/MobileMenu.module.scss';

const MobileMenu = ({ isVisible = false, toggleMenu = false }) => {
	const [toggling, setToggling] = useState(false);

	useEffect(() => {
		if (isVisible) setToggling(true);

		setTimeout(() => {
			setToggling(false);
		}, 250);
	}, [isVisible]);

	return (
		<div
			className={`
				${styles.MobileMenu}  ${
				toggling
					? isVisible && styles.menuIsOpening
					: !isVisible && styles.menuIsClosed
			}
			`}
		>
			<button onClick={toggleMenu} className={styles.CloseBtn}>
				X
			</button>
			<div className={styles.LinksWrapper}>
				<Link href={'/'}>
					<a className={styles.Link}>Pure</a>
				</Link>
				<Link href={'/'}>
					<a className={styles.Link}>Service</a>
				</Link>
				<Link href={'/'}>
					<a className={styles.Link}>Transport</a>
				</Link>
				<Link href={'/'}>
					<a className={styles.Link}>Showrooms</a>
				</Link>
				<Link href={'/'}>
					<a className={styles.Link}>Accessories {'&'} Parts</a>
				</Link>
			</div>
		</div>
	);
};

export default MobileMenu;
