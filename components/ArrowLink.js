import Link from 'next/link';
import styles from '../scss/components/ui/ArrowBtn.module.scss';
import ArrowLine from './ui/ArrowLine';

const ArrowBtn = ({ href, name = '' }) => {
  return (
    <Link href={href} className={styles.arrowLineBtn}>
      {name} <ArrowLine styles={styles.arrow} />
    </Link>
  );
};

export default ArrowBtn;
