import Link from 'next/link';
import styles from '../scss/components/ui/ArrowBtn.module.scss';
import ArrowLine from './ui/ArrowLine';

const ArrowBtn = ({ href, name }) => {
	return (
		<Link href={href}>
			<a className={styles.arrowLineBtn}>
				{name || 'Undefined' + ' '} <ArrowLine styles={styles.arrow} />
			</a>
		</Link>
	);
};

export default ArrowBtn;
